import { useEffect, useState } from "react";
import GithubRepoCard from "@/components/github/GithubRepoCard";
import GithubSearchForm from "@/components/github/GithubSearch";
import { fetchUserRepos } from "@/lib/githubApi";
import type { GithubRepo } from "@/lib/githubApi";

const GithubExplorer = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchUserRepos("your-username");
        setRepos(data as GithubRepo[]);
      } catch (err) {
        setError("Could not load repositories");
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  return (
    <div>
      <GithubSearchForm />
      <GithubRepoCard />
    </div>
  );
};

export default GithubExplorer;
