import { useEffect, useState } from 'react';

import AuditForm from '@/components/ada/AuditForm';
import AuditSummary from '@/components/ada/AuditSummary';
import type { AuditResult } from '@/components/ada/types';
import ViolationList from '@/components/ada/ViolationList';
import PageHeader from '@/components/common/PageHeader';
import { trackEvent } from '@/lib/analytics';
import { scanPage } from '@/lib/auditApi';

const LAST_SCAN_STORAGE_KEY = 'ada:last-scan';

const getStoredScan = (): AuditResult | null => {
  try {
    const stored = localStorage.getItem(LAST_SCAN_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as AuditResult;
  } catch {
    return null;
  }
};

const AdaAudit = () => {
  const [results, setResults] = useState<AuditResult | null>(null);
  const [initialUrl, setInitialUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedScan = getStoredScan();

    if (storedScan) {
      setResults(storedScan);
      setInitialUrl(storedScan.url);
    }
  }, []);

  const handleSubmit = async (url: string) => {
    setError(null);

    let normalizedUrl = url.trim();

    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(normalizedUrl);

      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        setError('Please enter a valid http or https URL.');
        setResults(null);

        trackEvent('audit_scan_error', {
          location: 'audit_form',
          error_type: 'invalid_protocol',
        });

        return;
      }
    } catch {
      setError('Please enter a valid URL.');
      setResults(null);

      trackEvent('audit_scan_error', {
        location: 'audit_form',
        error_type: 'invalid_url',
      });

      return;
    }

    setIsLoading(true);

    try {
      const response = await scanPage(parsedUrl.toString());

      setResults(response);
      setInitialUrl(response.url);
      localStorage.setItem(LAST_SCAN_STORAGE_KEY, JSON.stringify(response));

      trackEvent('audit_scan_success', {
        location: 'audit_results',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setResults(null);

      trackEvent('audit_scan_error', {
        location: 'audit_form',
        error_type: 'request_failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const liveMessage = isLoading
    ? 'Running accessibility audit.'
    : error
      ? `Audit error: ${error}`
      : results
        ? `Audit complete. ${results.violations.length} violations found for ${results.url}.`
        : '';

  return (
    <div className="section-stack">
      <PageHeader
        title="Accessibility Audit"
        description="Run a live page audit and review accessibility issues in a clear, developer-friendly workflow."
      />

      <AuditForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        initialUrl={initialUrl}
        lastScannedUrl={results?.url}
        lastScannedAt={results ? new Date(results.scannedAt).toLocaleString() : undefined}
      />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      {!results && !isLoading && !error ? (
        <div className="rounded-xl border border-dashed border-border/70 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Enter a publicly accessible URL above to run your first accessibility audit.
          </p>
        </div>
      ) : null}

      <AuditSummary results={results} />

      {!isLoading && !error && results && results.violations.length === 0 ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-900/40 dark:bg-green-950/30">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            No accessibility violations were found. This page passed the current axe-core
            audit checks <span aria-hidden="true">🎉</span>
          </p>
        </div>
      ) : null}

      <ViolationList violations={results?.violations ?? []} />
    </div>
  );
};

export default AdaAudit;
