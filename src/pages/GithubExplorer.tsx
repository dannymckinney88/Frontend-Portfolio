import { useEffect, useRef, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import GithubProfileCard from "@/components/github/GithubProfileCard";
import GithubRepoList from "@/components/github/GithubRepoList";
import GithubSearch from "@/components/github/GithubSearch";
import { Button } from "@/components/ui/button";
import {
  fetchUserProfile,
  fetchUserRepos,
  type GithubProfile,
  type GithubRepo,
} from "@/lib/githubApi";

/**
 * Default username so the page loads with real data
 */
const DEFAULT_USERNAME = "dannymckinney88";

/**
 * Session storage key for GitHub cache
 */
const GITHUB_CACHE_KEY = "github-explorer-cache";

/**
 * Number of repositories shown per page
 */
const REPOS_PER_PAGE = 6;

/**
 * GitHub Repository Explorer Page
 */
function GithubExplorer() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const repoListRef = useRef<HTMLDivElement | null>(null);
  const firstRepoRef = useRef<HTMLLIElement | null>(null);

  /**
   * Pagination values
   */
  const totalPages = Math.ceil(repos.length / REPOS_PER_PAGE);
  const startIndex = (currentPage - 1) * REPOS_PER_PAGE;
  const endIndex = startIndex + REPOS_PER_PAGE;
  const paginatedRepos = repos.slice(startIndex, endIndex);

  /**
   * Fetch GitHub profile and repositories for a username
   */
  const loadGithubData = async (targetUsername: string) => {
    try {
      setLoading(true);
      setError(null);

      const [profileData, repoData] = await Promise.all([
        fetchUserProfile(targetUsername),
        fetchUserRepos(targetUsername),
      ]);

      setProfile(profileData);
      setRepos(repoData);
      setCurrentPage(1);

      sessionStorage.setItem(
        GITHUB_CACHE_KEY,
        JSON.stringify({
          username: targetUsername,
          profile: profileData,
          repos: repoData,
        }),
      );
    } catch (err) {
      console.error(err);
      setProfile(null);
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

    loadGithubData(trimmedUsername);
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
     * Reuse cached GitHub data during the session to avoid unnecessary API calls.
     */
    const cached = sessionStorage.getItem(GITHUB_CACHE_KEY);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);

        if (
          parsed.username === DEFAULT_USERNAME &&
          parsed.profile &&
          Array.isArray(parsed.repos)
        ) {
          setProfile(parsed.profile);
          setRepos(parsed.repos);
          setCurrentPage(1);
          setLoading(false);
          return;
        }
      } catch (cacheError) {
        console.error("Failed to parse GitHub cache:", cacheError);
      }
    }

    loadGithubData(DEFAULT_USERNAME);
  }, []);

  /**
   * Scroll to the repository list and focus the first repository after page changes.
   */
  useEffect(() => {
    if (currentPage === 1) return;

    if (repoListRef.current) {
      repoListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (firstRepoRef.current) {
      firstRepoRef.current.focus();
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
            Loading GitHub profile and repositories...
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

        {!loading && !error && profile && (
          <GithubProfileCard profile={profile} />
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
              <GithubRepoList
                repos={paginatedRepos}
                firstRepoRef={firstRepoRef}
              />
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
