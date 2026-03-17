import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
function ProjectCard({
  title,
  description,
  features,
  stack,
  projectHref,
  codeHref,
}: ProjectCardProps) {
  return (
    <Card className="h-full min-h-88 transition hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex flex-1 flex-col">
          <CardHeader className="space-y-3 p-0">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>

          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <p className="pt-4 text-xs text-muted-foreground mt-auto">{stack}</p>
        </div>

        <div className="mt-6 flex gap-2">
          <Button className="min-w-28" asChild>
            <Link to={projectHref}>View Project</Link>
          </Button>

          <Button className="min-w-28" variant="outline" asChild>
            <a href={codeHref} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
