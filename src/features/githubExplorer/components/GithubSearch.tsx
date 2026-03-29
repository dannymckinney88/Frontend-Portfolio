import type { FormEvent } from 'react';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GithubSearchProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const GithubSearch = ({
  username,
  onUsernameChange,
  onSearch,
  isLoading,
}: GithubSearchProps) => {
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
      className="surface stack"
      aria-label="Search GitHub repositories by username"
    >
      <label htmlFor="github-username" className="text-sm font-medium leading-none">
        GitHub username
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
          className="flex-1"
        />

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={!username.trim() || isLoading}
        >
          <Search aria-hidden="true" />
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      <p id="github-search-helper" className="text-sm text-muted-foreground">
        Search public repositories for any GitHub user.
      </p>
    </form>
  );
};

export default GithubSearch;
