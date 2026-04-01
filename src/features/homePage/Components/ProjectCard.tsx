import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics';

export interface ProjectCardProps {
  title: string;
  description: string;
  features: string[];
  stack: string[];
  projectHref: string;
  codeHref: string;
  index?: number;
}

const ProjectCard = ({
  title,
  description,
  stack,
  projectHref,
  codeHref,
  index,
}: ProjectCardProps) => {
  const isExternal = projectHref.startsWith('http');

  return (
    <Card className="flex h-full flex-col border-border/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex h-full flex-col p-6">
        {index !== undefined && (
          <p
            className="mb-3 text-2xl font-bold tracking-tight text-muted-foreground/70"
            aria-hidden="true"
          >
            {String(index).padStart(2, '0')}
          </p>
        )}

        <CardTitle className="text-base font-semibold leading-snug tracking-tight">
          {title}
        </CardTitle>

        <CardDescription className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </CardDescription>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {stack.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="px-2.5 py-1 text-xs font-medium"
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            {isExternal ? (
              <Button asChild size="sm" variant="outline">
                <a
                  href={projectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} (opens in new tab)`}
                  onClick={() =>
                    trackEvent('click_project_view', {
                      project_name: title,
                      location: 'project_card',
                    })
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    View Project
                    <ExternalLink size={12} aria-hidden="true" />
                  </span>
                </a>
              </Button>
            ) : (
              <Button asChild size="sm" variant="outline">
                <Link
                  to={projectHref}
                  aria-label={`View ${title}`}
                  onClick={() =>
                    trackEvent('click_project_view', {
                      project_name: title,
                      location: 'project_card',
                    })
                  }
                >
                  View Project
                </Link>
              </Button>
            )}

            <Button asChild variant="ghost" size="sm">
              <a
                href={codeHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source for ${title} (opens in new tab)`}
                onClick={() =>
                  trackEvent('click_project_code', {
                    project_name: title,
                    location: 'project_card',
                  })
                }
              >
                <span className="inline-flex items-center gap-1">
                  Source
                  <ExternalLink size={12} aria-hidden="true" />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
