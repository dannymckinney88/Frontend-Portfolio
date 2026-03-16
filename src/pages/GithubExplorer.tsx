import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import GithubSearch from "@/components/github/GithubSearch";
import GithubRepoList from "@/components/github/GithubRepoList";

import { fetchUserRepos } from "@/lib/githubApi";
import type { GithubRepo } from "@/lib/githubApi";

/**
 * Default username so the page loads with real data
 */
const DEFAULT_USERNAME = "dannymckinney88";

/**
 * GitHub Repository Explorer Page
 */
function GithubExplorer() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch repositories for a username
   */
  const loadRepos = async (targetUsername: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchUserRepos(targetUsername);
      setRepos(data);
    } catch (err) {
      console.error(err);

      setRepos([]);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initial load
   */
  useEffect(() => {
    loadRepos(DEFAULT_USERNAME);
  }, []);

  /**
   * Handle search submit
   */
  const handleSearch = () => {
    const trimmed = username.trim();

    if (!trimmed) return;

    loadRepos(trimmed);
  };

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="GitHub Repository Explorer"
          description="Search GitHub users and explore their public repositories. Built with React, TypeScript, and API-driven UI patterns."
        />

        <GithubSearch
          username={username}
          onUsernameChange={setUsername}
          onSearch={handleSearch}
          isLoading={loading}
        />

        {loading && (
          <p
            className="text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            Loading repositories...
          </p>
        )}

        {error && (
          <p
            className="text-sm text-destructive"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p
            className="text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            No public repositories found.
          </p>
        )}

        {!loading && !error && repos.length > 0 && (
          <GithubRepoList repos={repos} />
        )}
      </div>
    </div>
  );
}

export default GithubExplorer;
