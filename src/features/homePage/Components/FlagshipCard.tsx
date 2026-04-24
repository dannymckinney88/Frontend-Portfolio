import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics';

interface FlagshipHighlight {
  n: string;
  title: string;
  body: string;
}

interface FlagshipMetric {
  value: string;
  label: string;
}

interface FlagshipCardProps {
  eyebrow: string;
  title: string;
  lede: string;
  highlights: FlagshipHighlight[];
  stack: string[];
  metrics: FlagshipMetric[];
  projectHref: string;
  codeHref: string;
  ctaPrimary: string;
  imageSrc: string;
  imageAlt: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
}

// Border classes for 2-col mobile / 4-col desktop metric grid
const metricCellBorder = (i: number): string => {
  if (i === 0) return '';
  if (i === 1) return 'border-l border-border/40';
  if (i === 2) return 'border-t border-border/40 sm:border-t-0 sm:border-l';
  return 'border-t border-l border-border/40 sm:border-t-0';
};

const FlagshipCard = ({
  eyebrow,
  title,
  lede,
  highlights,
  stack,
  metrics,
  projectHref,
  codeHref,
  ctaPrimary,
  imageSrc,
  imageAlt,
}: FlagshipCardProps) => {
  const isProjectExternal = projectHref.startsWith('http');

  return (
    <Card className="overflow-hidden border-border/60 bg-card p-0 shadow-sm motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: screenshot */}
          <div className="min-w-0 border-b border-border/60 bg-linear-to-br from-muted/40 to-background p-3 sm:p-4 lg:border-r lg:border-b-0 lg:p-5">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-md">
              {/* Browser chrome */}
              <div
                className="flex items-center gap-1.5 border-b border-border/50 bg-muted/50 px-4 py-2.5"
                aria-hidden="true"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              </div>
              <img
                src={imageSrc}
                alt={imageAlt}
                className="block w-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="flex min-w-0 flex-col justify-between p-6 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center rounded-full border border-border/60 bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-section-label">
                {eyebrow}
              </span>

              <div className="space-y-1.5">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {lede}
                </p>
              </div>

              {/* Numbered highlights */}
              <ol className="flex flex-col gap-4" aria-label={`${title} highlights`}>
                {highlights.map((h) => (
                  <li key={h.n} className="flex gap-3.5">
                    <span
                      className="mt-px shrink-0 font-mono text-[11px] font-semibold leading-5 text-section-label"
                      aria-hidden="true"
                    >
                      {h.n}
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-5 text-foreground">
                        {h.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {h.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-1.5">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-border/60 bg-muted/30 sm:grid-cols-4">
                {metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`flex flex-col items-center px-4 py-3.5 ${metricCellBorder(i)}`}
                  >
                    <dd className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {m.value}
                    </dd>
                    <dt className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {isProjectExternal ? (
                <Button asChild size="lg" className="min-w-44">
                  <a
                    href={projectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('click_project_view', {
                        project_name: title,
                        location: 'flagship_card',
                      })
                    }
                  >
                    {ctaPrimary}
                    <ArrowRight aria-hidden="true" />
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" className="min-w-44">
                  <Link
                    to={projectHref}
                    onClick={() =>
                      trackEvent('click_project_view', {
                        project_name: title,
                        location: 'flagship_card',
                      })
                    }
                  >
                    {ctaPrimary}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              )}

              <Button variant="outline" asChild size="lg">
                <a
                  href={codeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('click_project_code', {
                      project_name: title,
                      location: 'flagship_card',
                    })
                  }
                >
                  View code
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlagshipCard;
