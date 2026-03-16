import { useEffect, useState, useRef } from "react";

import PageHeader from "@/components/common/PageHeader";
import GithubSearch from "@/components/github/GithubSearch";
import GithubRepoList from "@/components/github/GithubRepoList";
import { Button } from "@/components/ui/button";
import { fetchUserRepos } from "@/lib/githubApi";
import type { GithubRepo } from "@/lib/githubApi";

/**
 * Default username so the page loads with real data
 */
const DEFAULT_USERNAME = "dannymckinney88";

/**
 * Session storage key for GitHub repo caching
 */
const GITHUB_CACHE_KEY = "github-repos-cache";

/**
 * Number of repositories shown per page
 */
const REPOS_PER_PAGE = 6;

/**
 * GitHub Repository Explorer Page
 */
function GithubExplorer() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const repoListRef = useRef<HTMLDivElement | null>(null);

  /**
   * Pagination values
   */
  const totalPages = Math.ceil(repos.length / REPOS_PER_PAGE);
  const startIndex = (currentPage - 1) * REPOS_PER_PAGE;
  const endIndex = startIndex + REPOS_PER_PAGE;
  const paginatedRepos = repos.slice(startIndex, endIndex);

  /**
   * Fetch repositories for a username
   */
  const loadRepos = async (targetUsername: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchUserRepos(targetUsername);

      setRepos(data);
      setCurrentPage(1);

      sessionStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify({
          username: targetUsername,
          repos: data,
        }),
      );
    } catch (err) {
      console.error(err);
      setRepos([]);
      setCurrentPage(1);

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
   * Handle search submit
   */
  const handleSearch = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

    loadRepos(trimmedUsername);
  };

  /**
   * Move to the next page
   */
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  /**
   * Move to the previous page
   */
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  /**
   * Initial load
   */
  useEffect(() => {
    /**
     * Reuse cached repo data during the session to avoid unnecessary API calls.
     */
    const cached = sessionStorage.getItem(GITHUB_CACHE_KEY);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);

        if (
          parsed.username === DEFAULT_USERNAME &&
          Array.isArray(parsed.repos)
        ) {
          setRepos(parsed.repos);
          setCurrentPage(1);
          setLoading(false);
          return;
        }
      } catch (cacheError) {
        console.error("Failed to parse GitHub cache:", cacheError);
      }
    }

    loadRepos(DEFAULT_USERNAME);
  }, []);

  useEffect(() => {
    if (repoListRef.current) {
      repoListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  return (
    <div className="w-full px-4 py-12">
      <div className="w-full space-y-8">
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
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, repos.length)} of{" "}
              {repos.length} repositories
            </p>

            <div id="repo-list" ref={repoListRef}>
              <GithubRepoList repos={paginatedRepos} />
            </div>

            {totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-6 pt-4"
                aria-label="Repository pagination"
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Go to previous page"
                  aria-controls="repo-list"
                >
                  Previous
                </Button>

                <span
                  className="min-w-28 text-center text-sm text-muted-foreground"
                  aria-live="polite"
                >
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Go to next page"
                  aria-controls="repo-list"
                >
                  Next
                </Button>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GithubExplorer;
