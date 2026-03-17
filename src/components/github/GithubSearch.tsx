import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GithubSearchProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

/**
 * GitHub username search form
 */
function GithubSearch({
  username,
  onUsernameChange,
  onSearch,
  isLoading,
}: GithubSearchProps) {
  /**
   * Handle form submit
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim() || isLoading) {
      return;
    }

    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-end"
      aria-label="Search GitHub repositories by username"
    >
      <div className="flex-1 space-y-2">
        <label
          htmlFor="github-username"
          className="text-sm font-medium leading-none"
        >
          GitHub username
        </label>

        <Input
          id="github-username"
          type="text"
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          placeholder="Enter a GitHub username"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          disabled={isLoading}
          aria-describedby="github-search-helper"
        />

        <p id="github-search-helper" className="text-sm text-muted-foreground">
          Search public repositories for any GitHub user.
        </p>
      </div>

      <Button
        type="submit"
        className="sm:min-w-32"
        disabled={!username.trim() || isLoading}
      >
        <Search className="mr-2 h-4 w-4" aria-hidden="true" />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}

export default GithubSearch;
