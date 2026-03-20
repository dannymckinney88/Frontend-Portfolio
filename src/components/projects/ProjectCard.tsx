import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

export interface ProjectCardProps {
  title: string;
  description: string;
  features: string[];
  stack: string[];
  projectHref: string;
  codeHref: string;
}

const ProjectCard = ({
  title,
  description,
  features,
  stack,
  projectHref,
  codeHref,
}: ProjectCardProps) => {
  return (
    <Card className="flex h-full flex-col border-border/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        {/* Top */}
        <div>
          <div className="space-y-4">
            <CardTitle className="line-clamp-2 min-h-14 text-xl font-semibold tracking-tight">
              {title}
            </CardTitle>

            <CardDescription className="min-h-18 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {description}
            </CardDescription>
          </div>

          <div className="mt-6 border-t border-border/60 pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Highlights
            </p>

            <ul className="list-disc space-y-2.5 pl-5 text-sm leading-7 marker:text-muted-foreground">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-6">
          <div className="flex min-h-14 flex-wrap content-start gap-2">
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

          <div className="mt-auto flex gap-3 pt-6">
            <Button asChild>
              <Link to={projectHref}>View Project</Link>
            </Button>

            <Button variant="outline" asChild>
              <a href={codeHref} target="_blank" rel="noopener noreferrer">
                View Code
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
