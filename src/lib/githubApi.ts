const BASE_URL = "https://api.github.com";

/**
 * GitHub repository response
 */
export interface GithubRepoResponse {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
}

/**
 * GitHub profile response
 */
export interface GithubProfileResponse {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  company: string | null;
  location: string | null;
  blog: string | null;
}

/**
 * GitHub repository view model
 */
export interface GithubRepo {
  id: number;
  name: string;
  repoUrl: string;
  description: string;
  stars: number;
  language: string;
  updatedAt: string;
  homepage: string | null;
}

/**
 * GitHub profile view model
 */
export interface GithubProfile {
  avatarUrl: string;
  name: string | null;
  login: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  company: string | null;
  location: string | null;
  blog: string | null;
  profileUrl: string;
}

/**
 * Map GitHub repository API data to the UI shape
 */
const mapRepo = (repo: GithubRepoResponse): GithubRepo => ({
  id: repo.id,
  name: repo.name,
  repoUrl: repo.html_url,
  description: repo.description || "No description available.",
  stars: repo.stargazers_count,
  language: repo.language || "Not specified",
  updatedAt: repo.updated_at,
  homepage: repo.homepage,
});

/**
 * Map GitHub profile API data to the UI shape
 */
const mapProfile = (profile: GithubProfileResponse): GithubProfile => ({
  avatarUrl: profile.avatar_url,
  name: profile.name,
  login: profile.login,
  bio: profile.bio,
  followers: profile.followers,
  following: profile.following,
  publicRepos: profile.public_repos,
  company: profile.company,
  location: profile.location,
  blog: profile.blog,
  profileUrl: profile.html_url,
});

/**
 * Handle GitHub API errors
 */
const handleGithubError = (response: Response, fallbackMessage: string) => {
  if (response.status === 404) {
    throw new Error("GitHub user not found.");
  }

  throw new Error(fallbackMessage);
};

/**
 * Fetch public repositories for a GitHub user
 */
export const fetchUserRepos = async (
  username: string,
): Promise<GithubRepo[]> => {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`,
  );

  if (!response.ok) {
    handleGithubError(response, "Failed to fetch repositories.");
  }

  const data: GithubRepoResponse[] = await response.json();

  return data.filter((repo) => !repo.fork).map(mapRepo);
};

/**
 * Fetch public profile data for a GitHub user
 */
export const fetchUserProfile = async (
  username: string,
): Promise<GithubProfile> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    handleGithubError(response, "Failed to fetch GitHub profile.");
  }

  const data: GithubProfileResponse = await response.json();

  return mapProfile(data);
};
