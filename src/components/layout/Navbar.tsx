import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="max-w-6xl mx-auto flex items-center gap-8 px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          React Practice Hub
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium hover:text-primary transition"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/counter"
                  className="px-3 py-2 text-sm font-medium hover:text-primary transition"
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
}
