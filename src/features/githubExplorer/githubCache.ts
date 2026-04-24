import type { GithubProfile, GithubRepo } from '@/lib/githubApi';

const GITHUB_CACHE_KEY = 'github-explorer-cache';

interface GithubExplorerCache {
  username: string;
  profile: GithubProfile;
  repos: GithubRepo[];
}

export const readGithubCache = (): GithubExplorerCache | null => {
  const cachedData = localStorage.getItem(GITHUB_CACHE_KEY);

  if (!cachedData) return null;

  try {
    const parsedCache = JSON.parse(cachedData) as Partial<GithubExplorerCache>;

    if (
      typeof parsedCache.username === 'string' &&
      parsedCache.profile &&
      Array.isArray(parsedCache.repos)
    ) {
      return {
        username: parsedCache.username,
        profile: parsedCache.profile as GithubProfile,
        repos: parsedCache.repos as GithubRepo[],
      };
    }
  } catch (error) {
    console.error('Failed to parse GitHub cache:', error);
  }

  return null;
};

export const writeGithubCache = (cache: GithubExplorerCache) => {
  localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(cache));
};
