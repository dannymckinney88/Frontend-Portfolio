import { useEffect, useRef, useState } from 'react';

import PageHeader from '@/components/common/PageHeader';
import PaginationControls from '@/components/common/PaginationControls';
import SectionState from '@/components/common/SectionState';
import GithubProfileCard from '@/components/github/GithubProfileCard';
import GithubRepoList from '@/components/github/GithubRepoList';
import GithubSearch from '@/components/github/GithubSearch';
import {
  fetchUserProfile,
  fetchUserRepos,
  type GithubProfile,
  type GithubRepo,
} from '@/lib/githubApi';

const DEFAULT_USERNAME = 'dannymckinney88';

const GITHUB_CACHE_KEY = 'github-explorer-cache';

const REPOS_PER_PAGE = 6;

function GithubExplorer() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const repoListRef = useRef<HTMLDivElement | null>(null);
  const firstRepoRef = useRef<HTMLLIElement | null>(null);

  const totalPages = Math.ceil(repos.length / REPOS_PER_PAGE);
  const startIndex = (currentPage - 1) * REPOS_PER_PAGE;
  const endIndex = startIndex + REPOS_PER_PAGE;
  const paginatedRepos = repos.slice(startIndex, endIndex);

  /**
   * Load GitHub profile and repositories for a user
   */
  const loadGithubUserData = async (targetUsername: string) => {
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

      localStorage.setItem(
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
        setError('Unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load data for the entered GitHub username
   */
  const handleSearch = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) return;

    loadGithubUserData(trimmedUsername);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const cachedData = localStorage.getItem(GITHUB_CACHE_KEY);

    if (cachedData) {
      try {
        const parsedCache = JSON.parse(cachedData);

        if (
          parsedCache.username &&
          parsedCache.profile &&
          Array.isArray(parsedCache.repos)
        ) {
          setUsername(parsedCache.username);
          setProfile(parsedCache.profile);
          setRepos(parsedCache.repos);
          setCurrentPage(1);
          setLoading(false);
          return;
        }
      } catch (cacheError) {
        console.error('Failed to parse GitHub cache:', cacheError);
      }
    }

    loadGithubUserData(DEFAULT_USERNAME);
  }, []);

  /**
   * Scroll to the repository list and focus the first repository after page changes
   */
  useEffect(() => {
    if (currentPage === 1) return;

    if (repoListRef.current) {
      repoListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    if (firstRepoRef.current) {
      firstRepoRef.current.focus();
    }
  }, [currentPage]);

  return (
    <section className="section-stack lg:py-32 max-w-6xl md:py-24 mx-auto px-4 py-16 sm:px-6 w-full">
      <PageHeader
        title="GitHub Repository Explorer"
        description="A performant and accessible GitHub repository explorer built with React and TypeScript, showcasing API integration, pagination, persistent caching, and production-ready UI state management."
      />

      <GithubSearch
        username={username}
        onUsernameChange={setUsername}
        onSearch={handleSearch}
        isLoading={loading}
      />

      {loading && <SectionState message="Loading GitHub profile and repositories..." />}

      {error && (
        <SectionState message={error} tone="error" role="alert" live="assertive" />
      )}

      {!loading && !error && profile && (
        <div className="section-stack">
          <GithubProfileCard profile={profile} />

          {repos.length === 0 ? (
            <SectionState message="No public repositories found." />
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground">
                Showing{' '}
                <span className="text-foreground">
                  {startIndex + 1}-{Math.min(endIndex, repos.length)}
                </span>{' '}
                of <span className="text-foreground">{repos.length}</span> repositories
              </p>

              <div id="repo-list" ref={repoListRef}>
                <GithubRepoList repos={paginatedRepos} firstRepoRef={firstRepoRef} />
              </div>

              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPreviousPage={handlePreviousPage}
                  onNextPage={handleNextPage}
                  ariaControls="repo-list"
                />
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default GithubExplorer;
