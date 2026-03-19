import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AuditFormProps {
  onSubmit?: (url: string) => void;
  isLoading?: boolean;
  error?: string;
}

const AuditForm = ({ onSubmit, isLoading = false, error = '' }: AuditFormProps) => {
  const [url, setUrl] = useState('');

  const helpTextId = 'audit-url-help';
  const errorTextId = 'audit-url-error';
  const describedBy = error ? `${helpTextId} ${errorTextId}` : helpTextId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    onSubmit?.(trimmedUrl);
  };

  return (
    <Card className="border-border/70 shadow-sm">
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="stack gap-4" noValidate>
          <div className="stack gap-2">
            <label htmlFor="audit-url" className="text-sm font-medium text-foreground">
              Page URL
            </label>

            <Input
              id="audit-url"
              name="audit-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
              autoComplete="url"
              aria-describedby={describedBy}
              aria-invalid={error ? 'true' : 'false'}
            />

            <p id={helpTextId} className="text-sm text-muted-foreground">
              Enter a page URL to run a mock accessibility audit and review WCAG issues.
            </p>

            {error ? (
              <p id={errorTextId} className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" disabled={isLoading} className="sm:w-auto">
              {isLoading ? 'Scanning...' : 'Run Audit'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuditForm;
