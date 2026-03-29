import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
  return (
    <Card className="flex h-full flex-col border-border/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex h-full flex-col p-6">
        {index !== undefined && (
          <p
            className="mb-3 text-3xl font-bold tracking-tight text-muted-foreground/25"
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
              <Badge key={item} variant="secondary" className="px-2.5 py-1 text-xs font-medium">
                {item}
              </Badge>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Link
              to={projectHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
              onClick={() =>
                trackEvent('click_project_view', {
                  project_name: title,
                  location: 'project_card',
                })
              }
            >
              View <ExternalLink size={12} aria-hidden="true" />
            </Link>
            <a
              href={codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
              onClick={() =>
                trackEvent('click_project_code', {
                  project_name: title,
                  location: 'project_card',
                })
              }
            >
              Source
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
