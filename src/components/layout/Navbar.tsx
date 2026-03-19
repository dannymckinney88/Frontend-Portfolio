import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (isActive = false) =>
    cn(
      'inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium',
      'no-underline transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      isActive
        ? 'text-foreground underline underline-offset-4 decoration-1'
        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
    );

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const projects = document.getElementById('projects');
    if (!projects) return;
  }, [location.pathname]);

  const isHomeRoute = location.pathname === '/';

  const isProjectPage =
    location.pathname === '/todos' ||
    location.pathname === '/github' ||
    location.pathname === '/counter' ||
    location.pathname === '/accessibility-audit';

  const isHomeActive = isHomeRoute;
  const isProjectsActive = isProjectPage;
  return (
    <nav className="border-b border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          aria-label="Danny McKinney - Home"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Danny McKinney
        </Link>

        <ul className="flex flex-wrap items-center gap-1 sm:gap-2" role="list">
          <li>
            <Link
              to="/"
              className={navLinkClass(isHomeActive)}
              aria-current={isHomeActive ? 'page' : undefined}
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="/#projects"
              className={navLinkClass(isProjectsActive)}
              aria-current={isProjectsActive ? 'page' : undefined}
              onClick={handleProjectsClick}
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="https://github.com/dannymckinney88"
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass(false)}
            >
              GitHub
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
