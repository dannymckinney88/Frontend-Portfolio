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
      <div className="space-y-4">
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
              error
                ? 'audit-url-help audit-url-error'
                : showLastScan
                  ? 'audit-url-help audit-last-scan'
                  : 'audit-url-help'
            }
          />

          <p id="audit-url-help" className="text-sm text-muted-foreground">
            Enter a publicly accessible page URL to scan for accessibility issues.
          </p>

          {error ? (
            <p id="audit-url-error" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Running Audit...' : 'Run Audit'}
          </Button>

          {showLastScan ? (
            <div
              id="audit-last-scan"
              className="min-w-0 rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Last scan
              </p>
              <p className="truncate text-foreground">{lastScannedUrl}</p>
              <p className="text-muted-foreground">{lastScannedAt}</p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default AuditForm;
