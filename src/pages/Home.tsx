import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Small React projects focused on state management, component
            architecture, and accessible UI patterns.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="h-full transition hover:-translate-y-[2px] hover:shadow-md hover:border-border">
            <div className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Todo App</CardTitle>
                <CardDescription>
                  Full CRUD task manager with local storage persistence.
                </CardDescription>

                <p className="mt-2 text-sm text-muted-foreground/80">
                  React • TypeScript • Shadcn UI
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                <Button asChild>
                  <Link to="/todo">View Project</Link>
                </Button>
              </CardContent>
            </div>
          </Card>

          <Card className="h-full transition hover:-translate-y-[2px] hover:shadow-md hover:border-border">
            <div className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Counter App</CardTitle>
                <CardDescription>
                  Counter demo showcasing React state and component composition.
                </CardDescription>

                <p className="mt-2 text-sm text-muted-foreground/80">
                  React • TypeScript
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                <Button asChild>
                  <Link to="/counter">View Project</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
