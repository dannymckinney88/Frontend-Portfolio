import { Link, useLocation } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (path: string) =>
    cn(
      'inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors',
      location.pathname === path
        ? 'text-foreground underline underline-offset-4 decoration-1  pointer-events-none'
        : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    );

  const navActionClass =
    'inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-foreground/4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  return (
    <nav className="border-b border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          Danny McKinney
        </Link>

        <NavigationMenu aria-label="Primary navigation" className="max-w-full">
          <NavigationMenuList className="flex flex-wrap items-center gap-1 sm:gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={navLinkClass('/')}
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={navActionClass}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('projects')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Projects
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://github.com/dannymckinney88"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navActionClass}
                >
                  GitHub
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
