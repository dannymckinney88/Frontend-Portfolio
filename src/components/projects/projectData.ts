import type { ProjectCardProps } from "./ProjectCard";

/**
 * Portfolio project data
 */
export const projectData: ProjectCardProps[] = [
  {
    title: "GitHub Repository Explorer",
    description:
      "Search GitHub users and explore their public repositories with paginated results, session caching, and accessible navigation patterns.",
    features: [
      "GitHub REST API integration",
      "Accessibility-focused focus management",
      "Loading, empty, and error states",
      "Session-based caching for repeated searches",
    ],
    stack: "React • TypeScript",
    projectHref: "/github",
    codeHref: "https://github.com/dannymckinney88/Frontend-Portfolio",
  },
  {
    title: "Todo App",
    description:
      "Full CRUD task manager with filtering and local storage persistence.",
    features: [
      "Create, edit, and delete tasks",
      "Filter active and completed todos",
      "Persistent storage with localStorage",
    ],
    stack: "React • TypeScript • Shadcn UI",
    projectHref: "/todo",
    codeHref: "https://github.com/dannymckinney88/Frontend-Portfolio",
  },
  {
    title: "Counter App",
    description:
      "Simple counter demonstrating React state and component composition.",
    features: [
      "React useState fundamentals",
      "Reusable UI components",
      "Accessible button interactions",
    ],
    stack: "React • TypeScript",
    projectHref: "/counter",
    codeHref: "https://github.com/dannymckinney88/Frontend-Portfolio",
  },
];
