import GithubRepoCard from "./GithubRepoCard";

import type { GithubRepo } from "@/lib/githubApi";

interface GithubRepoListProps {
  repos: GithubRepo[];
}

/**
 * Display a list of GitHub repositories
 */
function GithubRepoList({ repos }: GithubRepoListProps) {
  return (
    <ul
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      aria-label="List of GitHub repositories"
    >
      {repos.map((repo) => (
        <GithubRepoCard key={repo.id} repo={repo} />
      ))}
    </ul>
  );
}

export default GithubRepoList;
