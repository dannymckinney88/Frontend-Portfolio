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
  description: string;
  projectHref: string;
  codeHref: string;
  ctaPrimary: string;
  imageSrc: string;
  imageAlt: string;
  highlights: FlagshipHighlight[];
  metrics: FlagshipMetric[];
  stack: string[];
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
}

const metricCellBorder = (index: number): string => {
  if (index === 0) return '';
  if (index === 1) return 'border-l border-border/40';
  if (index === 2) return 'border-t border-border/40 sm:border-t-0 sm:border-l';

  return 'border-t border-l border-border/40 sm:border-t-0';
};

export const FlagshipCard = ({
  eyebrow,
  title,
  description,
  projectHref,
  codeHref,
  ctaPrimary,
  imageSrc,
  imageAlt,
  highlights,
  metrics,
  stack,
  ctaSecondary,
  ctaSecondaryHref,
}: FlagshipCardProps) => {
  const isProjectExternal = projectHref.startsWith('http');

  return (
    <Card className="overflow-hidden border-border/60 bg-card p-0 shadow-sm motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0 border-b border-border/60 bg-linear-to-br from-muted/40 to-background p-3 sm:p-4 lg:border-r lg:border-b-0 lg:p-5">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-md">
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
                  {description}
                </p>
              </div>

              <ol className="flex flex-col gap-5" aria-label={`${title} highlights`}>
                {highlights.map((highlight) => (
                  <li key={highlight.n} className="flex gap-4">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/40 font-mono text-[11px] font-semibold text-muted-foreground"
                      aria-hidden="true"
                    >
                      {highlight.n}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-foreground">
                        {highlight.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {highlight.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-1.5" aria-label={`${title} tech stack`}>
                {stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-border/60 bg-muted/20 sm:grid-cols-4">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`min-w-0 px-4 py-3.5 text-left ${metricCellBorder(index)}`}
                  >
                    <dt className="text-[11px] font-medium uppercase leading-4 tracking-wide text-muted-foreground">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

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
                    <span className="sr-only"> opens in a new tab</span>
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

              {ctaSecondary && ctaSecondaryHref ? (
                <Button asChild variant="outline" size="lg">
                  <Link
                    to={ctaSecondaryHref}
                    onClick={() =>
                      trackEvent('click_project_case_study', {
                        project_name: title,
                        location: 'flagship_card',
                      })
                    }
                  >
                    {ctaSecondary}
                  </Link>
                </Button>
              ) : null}

              <Button
                asChild
                variant={!ctaSecondary && !ctaSecondaryHref ? 'outline' : 'ghost'}
                size="lg"
              >
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
                  <ExternalLink aria-hidden="true" />
                  <span className="sr-only"> opens in a new tab</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
