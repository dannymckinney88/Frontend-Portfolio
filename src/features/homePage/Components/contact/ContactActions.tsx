import { FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export const ContactActions = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild size="lg">
        <a
          href="mailto:hello@dannymckinney.dev"
          onClick={() =>
            trackEvent('click_contact_cta', {
              target: 'email',
              location: 'footer',
            })
          }
        >
          hello@dannymckinney.dev <span aria-hidden="true">→</span>
        </a>
      </Button>

      <Button
        asChild
        variant="ghost"
        size="lg"
        className="border border-background/30 text-background hover:bg-background/10 hover:text-background dark:border-border dark:text-foreground dark:hover:bg-muted"
      >
        <a
          href="/danny-mckinney-resume.pdf"
          download
          onClick={() =>
            trackEvent('click_contact_cta', {
              target: 'resume',
              location: 'footer',
            })
          }
        >
          <FileText aria-hidden="true" />
          Download resume <span aria-hidden="true">↓</span>
        </a>
      </Button>
    </div>
  );
};
