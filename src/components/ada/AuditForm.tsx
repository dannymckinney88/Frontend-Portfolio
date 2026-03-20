import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuditFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  initialUrl?: string;
  lastScannedUrl?: string;
  lastScannedAt?: string;
}

const AuditForm = ({
  onSubmit,
  isLoading,
  error,
  initialUrl = '',
  lastScannedUrl,
  lastScannedAt,
}: AuditFormProps) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(url);
  };

  const showLastScan = Boolean(lastScannedUrl && lastScannedAt);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card px-4 py-5 shadow-sm sm:px-5 sm:py-6"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <div className="max-w-2xl space-y-2.5">
          <div className="space-y-2">
            <label htmlFor="audit-url" className="text-sm font-medium text-foreground">
              Page URL
            </label>

            <Input
              id="audit-url"
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.example.com"
              autoComplete="url"
              inputMode="url"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? 'audit-url-help audit-url-error' : 'audit-url-help'
              }
            />

            <p id="audit-url-help" className="text-sm text-muted-foreground">
              Enter a publicly accessible page URL to run a live WCAG accessibility audit.
            </p>

            {error ? (
              <p id="audit-url-error" className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            ) : null}
          </div>

          <div>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? 'Running Audit...' : 'Run Audit'}
            </Button>
          </div>
        </div>

        {showLastScan ? (
          <div
            id="audit-last-scan"
            className="min-w-0 rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm"
          >
            <p className="text-[11px] font-medium text-muted-foreground">Last scanned</p>
            <p className="break-words text-sm text-foreground" title={lastScannedUrl}>
              {lastScannedUrl}
            </p>
            <p className="text-xs text-muted-foreground">{lastScannedAt}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default AuditForm;
