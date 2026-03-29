import { ExternalLink, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const GithubRepoCard = ({ repo }: GithubRepoCardProps) => {
  const updatedDate = new Date(repo.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const description = repo.description?.trim();
  const hasDescription = Boolean(description);
  const hasHomepage = Boolean(repo.homepage);

  return (
    <Card className="h-full border-border/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex flex-1 flex-col">
          <div className="space-y-3">
            <h3 className="wrap-break-word text-base font-semibold leading-6 tracking-tight">
              {repo.name}
            </h3>

            {hasDescription && (
              <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="mt-auto pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: languageColors[repo.language ?? ''] ?? '#9ca3af',
                  }}
                  aria-hidden="true"
                />
                <span className={!repo.language ? 'text-muted-foreground/60' : ''}>
                  {repo.language || 'Not specified'}
                </span>
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
        </div>

        <div
          className={`mt-3 flex border-t border-border/50 pt-3 sm:mt-4 sm:pt-4 ${
            hasHomepage ? 'flex-col gap-2 sm:flex-row' : 'flex-col'
          }`}
        >
          <Button
            size="sm"
            asChild
            className={hasHomepage ? 'min-w-0 sm:flex-1' : 'w-full'}
          >
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${repo.name} on GitHub`}
            >
              View Repo
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>

          {hasHomepage && (
            <Button size="sm" variant="outline" asChild className="min-w-0 sm:flex-1">
              <a
                href={repo.homepage!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${repo.name}`}
              >
                Demo
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GithubRepoCard;
