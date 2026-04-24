import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics';

type FeaturedProjectCardProps = {
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  projectHref: string;
  codeHref: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  ctaLabel?: string;
  scope?: string;
  /** Controls how the screenshot is presented. Defaults to 'browser'. */
  imageVariant?: 'browser' | 'plain';
  showDemoAccess?: boolean;
  demoCredentials?: {
    email: string;
    password: string;
  };
};

const FeaturedProjectCard = ({
  title,
  description,
  highlights,
  stack,
  projectHref,
  codeHref,
  imageSrc,
  imageAlt,
  eyebrow,
  ctaLabel = 'View Live System',
  scope,
  imageVariant = 'browser',
  showDemoAccess,
  demoCredentials,
}: FeaturedProjectCardProps) => {
  const isExternal = projectHref.startsWith('http');

  return (
    <Card className="overflow-hidden border-border/60 bg-card p-0 shadow-sm motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid items-stretch lg:grid-cols-[1.1fr_0.9fr]">
          {/* Image area */}
          <div className="min-w-0 border-b border-border/60 bg-linear-to-br from-muted/40 to-background p-3 sm:p-4 lg:border-r lg:border-b-0 lg:p-5">
            {imageVariant === 'browser' ? (
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
            ) : (
              /* Plain — mobile-first / product screenshots */
              <div className="flex h-full min-h-[300px] items-start justify-center">
                <div className="w-full max-w-[340px] overflow-hidden rounded-xl border border-border/50 shadow-sm">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="block w-full object-cover object-top"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
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
                {scope && <p className="text-sm leading-6 text-foreground/70">{scope}</p>}
              </div>

              <ul className="flex flex-col gap-2.5" aria-label={`${title} highlights`}>
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-section-label"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-6 text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>

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
            </div>

            {/* Bottom: demo access + CTAs */}
            <div className="mt-6 flex flex-col gap-4">
              {showDemoAccess && demoCredentials && (
                <div className="rounded-lg border border-border/60 bg-muted/40 px-3.5 py-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-section-label">
                    Demo access
                  </p>
                  <div className="grid grid-cols-[64px_1fr] gap-y-1 text-xs">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-mono text-foreground">
                      {demoCredentials.email}
                    </span>
                    <span className="text-muted-foreground">Password</span>
                    <span className="font-mono text-foreground">
                      {demoCredentials.password}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {isExternal ? (
                  <Button asChild size="lg" className="min-w-44">
                    <Link
                      target="_blank"
                      to={projectHref}
                      onClick={() =>
                        trackEvent('click_project_view', {
                          project_name: title,
                          location: 'featured_card',
                        })
                      }
                    >
                      {ctaLabel}
                      <ArrowRight aria-hidden="true" />
                      <span className="sr-only"> (opens in new tab)</span>
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="min-w-44">
                    <Link
                      to={projectHref}
                      onClick={() =>
                        trackEvent('click_project_view', {
                          project_name: title,
                          location: 'featured_card',
                        })
                      }
                    >
                      {ctaLabel}
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
                        location: 'featured_card',
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
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedProjectCard;
