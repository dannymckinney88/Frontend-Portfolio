import { Building2, ExternalLink, Globe, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { GithubProfile } from "@/lib/githubApi";

interface GithubProfileCardProps {
  profile: GithubProfile;
}

/**
 * GitHub profile summary card
 */
function GithubProfileCard({ profile }: GithubProfileCardProps) {
  const displayName = profile.name || profile.login;

  const websiteUrl =
    profile.blog && /^https?:\/\//i.test(profile.blog)
      ? profile.blog
      : profile.blog
        ? `https://${profile.blog}`
        : null;

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm transition hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <img
              src={profile.avatarUrl}
              alt={`${displayName} GitHub avatar`}
              className="h-24 w-24 rounded-2xl border border-border/70 object-cover shadow-sm sm:h-28 sm:w-28"
              loading="lazy"
            />

            <div className="min-w-0 space-y-4">
              <header className="space-y-2">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {displayName}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    @{profile.login}
                  </p>
                </div>

                {profile.bio && (
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    {profile.bio}
                  </p>
                )}
              </header>

              {(profile.company || profile.location || websiteUrl) && (
                <dl className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
                  {profile.company && (
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Company</dt>
                      <Building2
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <dd className="min-w-0 truncate">{profile.company}</dd>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Location</dt>
                      <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <dd>{profile.location}</dd>
                    </div>
                  )}

                  {websiteUrl && (
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Website</dt>
                      <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <dd className="min-w-0">
                        <a
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate underline-offset-4 transition hover:text-foreground hover:underline"
                          aria-label={`Visit website for ${displayName}`}
                        >
                          {profile.blog}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              <dl className="grid grid-cols-3 gap-3 sm:max-w-md">
                <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Followers
                  </dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {profile.followers}
                  </dd>
                </div>

                <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Following
                  </dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {profile.following}
                  </dd>
                </div>

                <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Repos
                  </dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {profile.publicRepos}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex shrink-0">
            <Button asChild>
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${displayName}'s GitHub profile`}
              >
                View Profile
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GithubProfileCard;
