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
      <div className="max-w-6xl mx-auto flex items-center gap-18 px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          React Lab
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/counter">Counter</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/todo">Todo</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
