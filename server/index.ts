import AxeBuilder from '@axe-core/playwright';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import dns from 'node:dns/promises';
import net from 'node:net';
import { type Browser, chromium } from 'playwright';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3001;
const API_SECRET = process.env.AUDIT_API_SECRET;

app.set('trust proxy', 1);

const auditLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait before scanning again.' },
});

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://www.dannymckinney.dev']
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  }),
);

app.use(express.json());

const isPrivateIpv4 = (ip: string) => {
  const parts = ip.split('.').map(Number);

  if (parts.length !== 4 || parts.some(Number.isNaN)) return false;

  return (
    parts[0] === 10 ||
    parts[0] === 127 ||
    parts[0] === 0 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
};

const isBlockedHostname = (hostname: string) => {
  const normalized = hostname.toLowerCase();

  return (
    normalized === 'localhost' ||
    normalized === '0.0.0.0' ||
    normalized.endsWith('.local')
  );
};

/**
 * Prevent scanning internal/private destinations from the server.
 */
const assertSafePublicUrl = async (parsedUrl: URL) => {
  if (isBlockedHostname(parsedUrl.hostname)) {
    throw new Error('That URL is not allowed.');
  }

  const ipVersion = net.isIP(parsedUrl.hostname);

  if (ipVersion) {
    if (isPrivateIpv4(parsedUrl.hostname)) {
      throw new Error('That URL is not allowed.');
    }

    return;
  }

  const lookup = await dns.lookup(parsedUrl.hostname);

  if (lookup.family === 4 && isPrivateIpv4(lookup.address)) {
    throw new Error('That URL is not allowed.');
  }
};

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post('/audit', auditLimiter, async (req: Request, res: Response) => {
  if (API_SECRET) {
    const provided = req.headers['x-api-secret'];

    if (provided !== API_SECRET) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }
  }

  const { url } = req.body as { url?: string };

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return res.status(400).json({ error: 'Please enter a valid http or https URL.' });
    }

    await assertSafePublicUrl(parsedUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Please enter a valid URL.';

    return res.status(400).json({ error: message });
  }

  let browser: Browser | null = null;
  let context: Awaited<ReturnType<Browser['newContext']>> | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(parsedUrl.toString(), {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });

    /**
     * Give client-rendered pages a short settle window before running axe.
     */
    await page.waitForTimeout(1500);

    const results = await new AxeBuilder({ page }).analyze();

    return res.json({
      url: parsedUrl.toString(),
      scannedAt: new Date().toISOString(),
      violations: results.violations,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
    });
  } catch (error) {
    console.error('Audit failed:', error);

    return res.status(500).json({
      error: 'Unable to complete the audit for this page.',
    });
  } finally {
    if (context) {
      await context.close().catch(() => null);
    }

    if (browser) {
      await browser.close().catch(() => null);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Audit server running at http://localhost:${PORT}`);
});
