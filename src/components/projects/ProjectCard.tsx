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
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex-1 space-y-4">
          <CardHeader className="space-y-3 p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <p className="text-muted-foreground text-xs">{stack}</p>
        </div>

        <div className="mt-6 flex gap-2">
          <Button className="w-32" asChild>
            <Link to={projectHref}>View Project</Link>
          </Button>

          <Button className="w-32" variant="outline" asChild>
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
