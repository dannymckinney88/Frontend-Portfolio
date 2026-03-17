import type { RefObject } from "react";

import type { GithubRepo } from "@/lib/githubApi";

import GithubRepoCard from "./GithubRepoCard";

interface GithubRepoListProps {
  repos: GithubRepo[];
  firstRepoRef?: RefObject<HTMLLIElement | null>;
}

/**
 * Display a list of GitHub repositories
 */
function GithubRepoList({ repos, firstRepoRef }: GithubRepoListProps) {
  return (
    <ul
      className="grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3"
      aria-label="List of GitHub repositories"
    >
      {repos.map((repo, index) => (
        <li
          key={repo.id}
          ref={index === 0 ? firstRepoRef : undefined}
          tabIndex={index === 0 ? -1 : undefined}
          className="h-full"
        >
          <GithubRepoCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}

export default GithubRepoList;
