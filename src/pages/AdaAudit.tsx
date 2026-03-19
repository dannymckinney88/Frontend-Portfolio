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
  const [error, setError] = useState('');

  const handleSubmit = async (url: string) => {
    setError('');

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Please enter a valid URL starting with http or https.');
      setResults(null);
      return;
    }

    setIsLoading(true);

    try {
      const response = await scanPage(url);
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

      {results ? (
        <p className="text-sm text-muted-foreground">Last scanned: {results.url}</p>
      ) : null}

      <AuditSummary results={results} />
      <ViolationList violations={results?.violations ?? []} />
    </div>
  );
};

export default AdaAudit;
