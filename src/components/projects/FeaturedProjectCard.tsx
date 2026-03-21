import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type FeaturedProjectCardProps = {
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  projectHref: string;
  codeHref: string;
  imageSrc: string;
  imageAlt: string;
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
}: FeaturedProjectCardProps) => {
  return (
    <Card className="overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          {/* Screenshot Panel */}
          <div className="border-b border-border/70 bg-gradient-to-br from-muted/40 to-background p-4 sm:p-5 lg:border-r lg:border-b-0 lg:p-6">
            <div className="overflow-hidden rounded-[26px] border border-border/70 bg-background shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 sm:px-5">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                </div>

                <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
                  live audit results
                </span>
              </div>

              <div className="bg-background p-2 sm:p-3">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="block h-auto w-full rounded-lg object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                  Featured Project
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  ADA / WCAG Differentiator
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {title}
                </h2>

                <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {description}
                </p>
              </div>

              <ul className="space-y-4" aria-label={`${title} highlights`}>
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-6 text-foreground sm:text-base">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild size="lg" className="min-w-48">
                  <Link to={projectHref}>
                    Run Accessibility Demo
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>

                <Button variant="outline" asChild size="lg">
                  <a href={codeHref} target="_blank" rel="noopener noreferrer">
                    View Code
                    <ExternalLink aria-hidden="true" />
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
