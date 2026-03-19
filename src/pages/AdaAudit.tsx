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

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);

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

  return (
    <div className="section-stack">
      <PageHeader
        title="Accessibility Audit"
        description="Run a page audit and review accessibility issues in a clear, developer-friendly format."
      />

      <AuditForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {!isLoading && results
          ? `Audit complete. ${results.violations.length} issues found for ${results.url}.`
          : ''}
        {isLoading ? 'Running accessibility audit...' : ''}
        {!isLoading && error ? `Error: ${error}` : ''}
      </div>

      {results ? (
        <p className="text-sm text-muted-foreground">
          Last scanned: <span className="font-medium">{results.url}</span> ·{' '}
          {new Date(results.scannedAt).toLocaleTimeString()}
        </p>
      ) : null}

      <AuditSummary results={results} />
      <ViolationList violations={results?.violations ?? []} />
    </div>
  );
};

export default AdaAudit;
