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

const BASE_URL = "https://api.github.com";

/**
 * Map GitHub API data to the UI shape
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
 * Fetch public repositories for a GitHub user
 */
export const fetchUserRepos = async (
  username: string,
): Promise<GithubRepo[]> => {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user not found.");
    }

    throw new Error("Failed to fetch repositories.");
  }

  const data: GithubRepoResponse[] = await response.json();

  return data.filter((repo) => !repo.fork).map(mapRepo);
};
