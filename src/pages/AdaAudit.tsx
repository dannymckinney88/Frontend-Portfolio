import { useState } from 'react';

import AuditForm from '@/components/ada/AuditForm';
import AuditSummary from '@/components/ada/AuditSummary';
import ViolationList from '@/components/ada/ViolationList';
import PageHeader from '@/components/common/PageHeader';
import { scanPage } from '@/lib/auditApi';

const AdaAudit = () => {
  const [results, setResults] = useState<null | {
    url: string;
    scannedAt: string;
    violations: unknown[];
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError('');

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

      <AuditForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {results ? (
        <p className="text-sm text-muted-foreground">Last scanned: {results.url}</p>
      ) : null}

      <AuditSummary />
      <ViolationList />
    </div>
  );
};

export default AdaAudit;
