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
  imageBadge?: string;
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
  imageBadge,
  ctaLabel = 'View Live System',
  scope,
  imageVariant = 'browser',
  showDemoAccess,
  demoCredentials,
}: FeaturedProjectCardProps) => {
  const isExternal = projectHref.startsWith('http');

  return (
    <Card className="overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 p-0">
      <CardContent className="p-0">
        <div className="grid items-stretch lg:grid-cols-[1.2fr_0.8fr]">
          {/* Image area */}
          <div className="border-b border-border/70 bg-linear-to-br from-muted/40 to-background p-4 sm:p-5 lg:border-r lg:border-b-0 lg:p-5">
            {imageVariant === 'browser' ? (
              /* Browser chrome frame — used for dashboard/desktop screenshots */
              <div className="overflow-hidden rounded-[26px] border border-border/70 bg-background shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 sm:px-5">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  </div>

                  {imageBadge && (
                    <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
                      {imageBadge}
                    </span>
                  )}
                </div>

                <div className="overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              /* Plain frame — used for mobile-first / product screenshots */
              <div className="overflow-hidden rounded-2xl border border-border/70 shadow-sm">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex h-full flex-col justify-between p-6 sm:p-7 lg:p-8">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-section-label">
                {eyebrow}
              </span>

              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h2>

                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {description}
                </p>

                {scope && (
                  <p className="max-w-xl text-sm leading-6 text-foreground/80">{scope}</p>
                )}
              </div>

              <ul className="space-y-3" aria-label={`${title} highlights`}>
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

              <div className="flex flex-wrap gap-1.5">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border/70 bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {showDemoAccess && demoCredentials && (
                <div className="mt-4 rounded-lg border border-border/70 bg-muted/50 p-3 text-xs">
                  <p className="mb-2 font-medium text-foreground">Demo access</p>

                  <div className="grid grid-cols-[70px_1fr] gap-y-1 text-muted-foreground">
                    <span className="text-foreground">Email:</span>
                    <span className="font-mono">demo@heelflow.app</span>

                    <span className="text-foreground">Password:</span>
                    <span className="font-mono">HeelflowDemo1!</span>
                  </div>
                </div>
              )}
              {isExternal ? (
                <Button asChild size="lg" className="min-w-48">
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
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="min-w-48">
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
                  View Code
                  <ExternalLink aria-hidden="true" />
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

export default FeaturedProjectCard;
