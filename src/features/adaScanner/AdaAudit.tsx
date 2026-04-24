import { useEffect, useState } from 'react';

import PageHeader from '@/components/common/PageHeader';
import AuditForm from '@/features/adaScanner/components/AuditForm';
import AuditSummary from '@/features/adaScanner/components/AuditSummary';
import ViolationList from '@/features/adaScanner/components/ViolationList';
import type { AuditResult } from '@/features/adaScanner/types';
import { trackEvent } from '@/lib/analytics';
import { scanPage } from '@/lib/auditApi';

import { normalizeAuditUrl } from './lib/normalizeAuditUrl';
import { readStoredScan, writeStoredScan } from './lib/scanStorage';

const AdaAudit = () => {
  const [results, setResults] = useState<AuditResult | null>(null);
  const [initialUrl, setInitialUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedScan = readStoredScan();

    if (storedScan) {
      setResults(storedScan);
      setInitialUrl(storedScan.url);
    }
  }, []);

  const handleSubmit = async (url: string) => {
    setError(null);

    const normalized = normalizeAuditUrl(url);

    if (!normalized.ok) {
      setError(normalized.message);
      setResults(null);

      trackEvent('audit_scan_error', {
        location: 'audit_form',
        error_type: normalized.errorType,
      });

      return;
    }

    setIsLoading(true);

    try {
      const response = await scanPage(normalized.url);

      setResults(response);
      setInitialUrl(response.url);
      writeStoredScan(response);

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

  const lastScannedAt = results
    ? new Date(results.scannedAt).toLocaleString()
    : undefined;

  return (
    <section className="section-stack mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:py-32">
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
        lastScannedAt={lastScannedAt}
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

      <ViolationList violation={results?.violations ?? []} />
    </section>
  );
};

export default AdaAudit;
