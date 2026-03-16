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
    <ul className="grid gap-5 sm:grid-cols-2" aria-label="GitHub repositories">
      {repos.map((repo) => (
        <GithubRepoCard key={repo.id} repo={repo} />
      ))}
    </ul>
  );
}

export default GithubRepoList;
