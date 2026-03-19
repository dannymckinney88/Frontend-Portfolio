import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Project card props
 */
export interface ProjectCardProps {
  title: string;
  description: string;
  features: string[];
  stack: string;
  projectHref: string;
  codeHref: string;
}

/**
 * Display a single project card
 */
const ProjectCard = ({
  title,
  description,
  features,
  stack,
  projectHref,
  codeHref,
}: ProjectCardProps) => {
  return (
    <Card className="h-full min-h-96 border-border/80 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex flex-1 flex-col">
          <CardHeader className="space-y-3 p-0">
            <CardTitle className="text-lg font-semibold tracking-tight">
              {title}
            </CardTitle>

            <CardDescription className="text-sm leading-6">{description}</CardDescription>
          </CardHeader>

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Highlights
            </p>

            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <p className="mt-auto pt-5 text-xs text-muted-foreground">{stack}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button className="button-standard" asChild>
            <Link to={projectHref}>View Project</Link>
          </Button>

          <Button className="button-standard" variant="outline" asChild>
            <a href={codeHref} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
