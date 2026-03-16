import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GithubRepo } from "@/lib/githubApi";

interface GithubRepoCardProps {
  repo: GithubRepo;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSharp: "#178600",
  "C#": "#178600",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
};

function GithubRepoCard({ repo }: GithubRepoCardProps) {
  const updatedDate = new Date(repo.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className="list-none">
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-border hover:shadow-md">
        <div className="flex h-full flex-col">
          <CardHeader className="flex flex-1 flex-col space-y-2">
            <div className="min-h-14">
              <CardTitle className="line-clamp-2 text-base leading-7">
                {repo.name}
              </CardTitle>
            </div>

            <div className="flex items-center gap-1">
              <dt className="sr-only">Language</dt>

              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: languageColors[repo.language] ?? "#9ca3af",
                }}
                aria-hidden="true"
              />

              <dd>{repo.language}</dd>
            </div>
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

          <CardContent className="pt-2 mt-auto">
            <div className="flex min-h-10 flex-wrap gap-2">
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
