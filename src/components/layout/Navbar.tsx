import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (path: string) =>
    cn(
      "no-underline transition-colors",
      location.pathname === path ? " underline underline-offset-4" : "",
    );

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center gap-18 px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          React Lab
        </Link>
        <NavigationMenu aria-label="Primary navigation">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={navLinkClass("/")}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/github"
                  className={navLinkClass("/github")}
                  aria-current={
                    location.pathname === "/github" ? "page" : undefined
                  }
                >
                  Github
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/todos"
                  className={navLinkClass("/todos")}
                  aria-current={
                    location.pathname === "/todos" ? "page" : undefined
                  }
                >
                  Todos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/counter"
                  className={navLinkClass("/counter")}
                  aria-current={
                    location.pathname === "/counter" ? "page" : undefined
                  }
                >
                  Counter
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
