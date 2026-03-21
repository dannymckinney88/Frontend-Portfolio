import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const yOffset = -10;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    element.focus({ preventScroll: true }); // ← add this
  };

  const handleSectionClick =
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname === '/') {
        e.preventDefault();
        scrollToSection(sectionId);
        return;
      }

      e.preventDefault();
      navigate(`/#${sectionId}`);
    };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // gives the DOM time to render before we try to scroll
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [location.hash]);

  const isHomeRoute = location.pathname === '/';

  const isProjectPage =
    location.pathname === '/todos' ||
    location.pathname === '/github' ||
    location.pathname === '/counter' ||
    location.pathname === '/accessibility-audit';

  const isHomeActive = isHomeRoute;
  const isProjectsActive =
    isProjectPage || (isHomeRoute && location.hash === '#projects');
  const isContactActive = isHomeRoute && location.hash === '#contact';

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
              href="/#featured-project"
              className={navLinkClass(isProjectsActive)}
              aria-current={isProjectsActive ? 'page' : undefined}
              onClick={handleSectionClick('featured-project')}
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="/#contact"
              className={navLinkClass(isContactActive)}
              aria-current={isContactActive ? 'page' : undefined}
              onClick={handleSectionClick('contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
