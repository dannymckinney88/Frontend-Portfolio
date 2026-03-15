export interface GithubRepo {
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

const BASE_URL = "https://api.github.com";

/**
 * Fetch user repositories
 */
export const fetchUserRepos = async (
  username: string,
): Promise<GithubRepo[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
};
