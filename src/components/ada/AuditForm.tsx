import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AuditFormProps {
  onSubmit?: (url: string) => void;
  isLoading?: boolean;
}

const AuditForm = ({ onSubmit, isLoading = false }: AuditFormProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) return;

    onSubmit?.(trimmedUrl);
  };

  return (
    <Card className="border-border/70 shadow-sm">
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="stack gap-4">
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
            />

            <p className="text-sm text-muted-foreground">
              Enter a page URL to run a mock accessibility audit and review WCAG issues.
            </p>
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
