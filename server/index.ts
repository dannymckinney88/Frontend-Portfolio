import AxeBuilder from '@axe-core/playwright';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import { type Browser, chromium } from 'playwright';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3001;
const API_SECRET = process.env.AUDIT_API_SECRET;

const auditLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait before scanning again.' },
});

app.use(cors());
app.use(express.json());

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
  } catch {
    return res.status(400).json({ error: 'Please enter a valid URL.' });
  }

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(parsedUrl.toString(), {
      waitUntil: 'networkidle',
      timeout: 15000,
    });

    await page
      .waitForFunction('document.querySelector("h1") !== null', { timeout: 8000 })
      .catch(() => null);

    const results = await new AxeBuilder({ page }).analyze();

    await context.close();

    return res.json({
      url: parsedUrl.toString(),
      scannedAt: new Date().toISOString(),
      violations: results.violations,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Audit failed.';

    return res.status(500).json({ error: message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Audit server running at http://localhost:${PORT}`);
});
