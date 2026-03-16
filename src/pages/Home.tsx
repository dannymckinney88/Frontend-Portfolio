import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";

const Home = () => {
  return (
    <div className="w-full px-4 py-12">
      <div className="w-full space-y-8">
        <PageHeader
          title="Projects"
          description="Small React projects focused on state management, component architecture, and accessible UI patterns."
        />

        <p className="text-sm text-muted-foreground/80">
          New projects are added regularly as I explore deeper React patterns,
          TypeScript, API integration, and accessible UI architecture.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="h-full transition hover:-translate-y-[2px] hover:shadow-md hover:border-border">
            <div className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>GitHub Repository Explorer</CardTitle>
                <CardDescription>
                  Search GitHub users and explore their public repositories
                  using the GitHub API.
                </CardDescription>

                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  <li>GitHub REST API integration</li>
                  <li>Loading, empty, and error states</li>
                  <li>Accessible UI patterns</li>
                </ul>

                <p className="mt-3 text-sm text-muted-foreground/80">
                  React • TypeScript
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex gap-2">
                  <Button asChild>
                    <Link to="/github">View Project</Link>
                  </Button>

                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com/dannymckinney88/Frontend-Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="h-full transition hover:-translate-y-[2px] hover:shadow-md hover:border-border">
            <div className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Todo App</CardTitle>
                <CardDescription>
                  Full CRUD task manager with filtering and local storage
                  persistence.
                </CardDescription>

                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  <li>Create, edit, and delete tasks</li>
                  <li>Filter active and completed todos</li>
                  <li>Persistent storage with localStorage</li>
                </ul>

                <p className="mt-3 text-sm text-muted-foreground/80">
                  React • TypeScript • Shadcn UI
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex gap-2">
                  <Button asChild>
                    <Link to="/todo">View Project</Link>
                  </Button>

                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com/dannymckinney88/Frontend-Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="h-full transition hover:-translate-y-[2px] hover:shadow-md hover:border-border">
            <div className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Counter App</CardTitle>
                <CardDescription>
                  Simple counter demonstrating React state and component
                  composition.
                </CardDescription>

                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  <li>React useState fundamentals</li>
                  <li>Reusable UI components</li>
                  <li>Accessible button interactions</li>
                </ul>

                <p className="mt-3 text-sm text-muted-foreground/80">
                  React • TypeScript
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex gap-2">
                  <Button asChild>
                    <Link to="/counter">View Project</Link>
                  </Button>

                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com/dannymckinney88/Frontend-Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
