import { ExternalLink, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { GithubRepo } from "@/lib/githubApi";

interface GithubRepoCardProps {
  repo: GithubRepo;
}

/**
 * Display a single GitHub repository
 */
function GithubRepoCard({ repo }: GithubRepoCardProps) {
  const updatedDate = new Date(repo.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className="list-none">
      <Card className="h-full transition hover:-translate-y-[2px] hover:shadow-md hover:border-border">
        <div className="flex h-full flex-col">
          <CardHeader className="space-y-2">
            <CardTitle className="text-base">{repo.name}</CardTitle>

            <p className="text-sm text-muted-foreground">{repo.description}</p>

            <dl className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <dt className="sr-only">Language</dt>
                <dd>{repo.language}</dd>
              </div>

              <div className="flex items-center gap-1">
                <dt className="sr-only">Stars</dt>
                <Star className="h-3 w-3" aria-hidden="true" />
                <dd>{repo.stars}</dd>
              </div>

              <div className="flex items-center gap-1">
                <dt className="sr-only">Last updated</dt>
                <dd>Updated {updatedDate}</dd>
              </div>
            </dl>
          </CardHeader>

          <CardContent className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View repository for ${repo.name} on GitHub`}
                >
                  View Repo
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              {repo.homepage && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo for ${repo.name}`}
                  >
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </li>
  );
}

export default GithubRepoCard;
