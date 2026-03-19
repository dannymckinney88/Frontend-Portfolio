import { useState } from 'react';

import AuditForm from '@/components/ada/AuditForm';
import AuditSummary from '@/components/ada/AuditSummary';
import type { AuditResult } from '@/components/ada/types';
import ViolationList from '@/components/ada/ViolationList';
import PageHeader from '@/components/common/PageHeader';
import { scanPage } from '@/lib/auditApi';

const AdaAudit = () => {
  const [results, setResults] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        return;
      }
    } catch {
      setError('Please enter a valid URL.');
      setResults(null);
      return;
    }

    setIsLoading(true);

    try {
      const response = await scanPage(parsedUrl.toString());
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const liveMessage = isLoading
    ? 'Running accessibility audit...'
    : error
      ? `Error: ${error}`
      : results
        ? `Audit complete. ${results.violations.length} issues found for ${results.url}.`
        : '';

  return (
    <div className="section-stack">
      <PageHeader
        title="Accessibility Audit"
        description="Run a page audit and review accessibility issues in a clear, developer-friendly format."
      />

      <AuditForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      {results ? (
        <p className="text-sm text-muted-foreground">
          Last scanned: <span className="font-medium">{results.url}</span> ·{' '}
          {new Date(results.scannedAt).toLocaleTimeString()}
        </p>
      ) : null}

      {!results && !isLoading && !error ? (
        <div className="rounded-xl border border-dashed border-border/70 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Enter a URL above to run your first accessibility audit.
          </p>
        </div>
      ) : null}

      <AuditSummary results={results} />
      {!isLoading && !error && results && results.violations.length === 0 ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-900/40 dark:bg-green-950/30">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            No accessibility violations found. This page passed all axe-core checks{' '}
            <span aria-hidden="true"> 🎉</span>
          </p>
        </div>
      ) : null}

      <ViolationList violations={results?.violations ?? []} />
      <ViolationList violations={results?.violations ?? []} />
    </div>
  );
};

export default AdaAudit;
