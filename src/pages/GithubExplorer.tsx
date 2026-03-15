import GithubRepoCard from "@/components/github/GithubRepoCard";
import GithubSearchForm from "@/components/github/GithubSearch";

const GithubExplorer = () => {
  return (
    <div>
      <GithubSearchForm />
      <GithubRepoCard />
    </div>
  );
};

export default GithubExplorer;
