import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { trackEvent } from '@/lib/analytics';
import { navLinks, routePaths } from '@/lib/routes';
import { cn } from '@/lib/utils';

const projectPagePaths = [
  routePaths.todoApp,
  routePaths.githubExplorer,
  routePaths.counterApp,
  routePaths.accessibilityAudit,
];

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
        ? 'text-foreground underline underline-offset-4 decoration-2'
        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
    );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const yOffset = -10;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    element.focus({ preventScroll: true });
  };

  const handleSectionClick =
    (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname === routePaths.home) {
        event.preventDefault();
        scrollToSection(sectionId);
        return;
      }

      event.preventDefault();
      navigate(`${routePaths.home}#${sectionId}`);
    };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [location.hash]);

  const isHomeRoute = location.pathname === routePaths.home;
  const isProjectPage = projectPagePaths.includes(
    location.pathname as (typeof projectPagePaths)[number],
  );

  const isLinkActive = (scrollTargetId?: string): boolean => {
    if (!scrollTargetId) {
      // Home link — active when on the home route with no section hash
      return isHomeRoute;
    }
    if (scrollTargetId === 'featured-project') {
      return isProjectPage || (isHomeRoute && location.hash === '#featured-project');
    }
    return isHomeRoute && location.hash === `#${scrollTargetId}`;
  };

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 hover:underline hover:-translate-0.5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to={routePaths.home}
          aria-label="Danny McKinney - Home"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Danny McKinney
        </Link>

        <ul className="flex flex-wrap items-center gap-1 sm:gap-2" role="list">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.scrollTargetId);

            if (link.scrollTargetId) {
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={navLinkClass(isActive)}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => {
                      trackEvent(`click_nav_${link.label.toLowerCase()}`, {
                        location: 'navbar',
                        target: link.scrollTargetId,
                      });
                      handleSectionClick(link.scrollTargetId!)(event);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={navLinkClass(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
