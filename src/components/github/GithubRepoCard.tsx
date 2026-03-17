import { ExternalLink, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { GithubRepo } from '@/lib/githubApi';

interface GithubRepoCardProps {
  repo: GithubRepo;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSharp: '#178600',
  'C#': '#178600',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
};

/**
 * Display a single GitHub repository card
 */
const GithubRepoCard = ({ repo }: GithubRepoCardProps) => {
  const updatedDate = new Date(repo.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="h-full border-border/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex flex-1 flex-col gap-4">
          <CardHeader className="space-y-2 p-0">
            <CardTitle className="min-h-14 line-clamp-2 text-base leading-7 font-semibold tracking-tight">
              {repo.name}
            </CardTitle>

            <CardDescription className="min-h-10 text-sm leading-6">
              {repo.description?.trim() || 'No description provided.'}
            </CardDescription>
          </CardHeader>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: languageColors[repo.language] ?? '#9ca3af',
                }}
                aria-hidden="true"
              />

              <span>{repo.language || 'Not specified'}</span>
            </div>

            <dl className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
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
    </Card>
  );
};

export default GithubRepoCard;
