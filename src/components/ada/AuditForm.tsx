import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuditFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  initialUrl?: string;
}

const AuditForm = ({ onSubmit, isLoading, error, initialUrl = '' }: AuditFormProps) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card px-5 py-6 shadow-sm"
    >
      <div className="space-y-2">
        <label htmlFor="audit-url" className="text-sm font-medium text-foreground">
          Page URL
        </label>

        <Input
          id="audit-url"
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          autoComplete="url"
          inputMode="url"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'audit-url-error' : 'audit-url-help'}
        />

        <p id="audit-url-help" className="text-sm text-muted-foreground">
          Enter a page URL to run an accessibility audit and review WCAG issues.
        </p>

        {error ? (
          <p id="audit-url-error" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Running Audit...' : 'Run Audit'}
        </Button>
      </div>
    </form>
  );
};

export default AuditForm;
