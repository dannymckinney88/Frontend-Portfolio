import type { ProjectCardProps } from "./ProjectCard";

/**
 * Portfolio project data
 */
export const projectData: ProjectCardProps[] = [
  {
    title: "GitHub Repository Explorer",
    description:
      "Browse public GitHub repositories through a performant, accessible interface with optimized data fetching, pagination, and persistent caching.",
    features: [
      "GitHub REST API integration with client-side filtering",
      "Accessible focus management and keyboard navigation",
      "Robust UI states (loading, empty, error)",
      "Local storage caching scoped by username to reduce redundant API calls and persist results",
    ],
    stack: "React • TypeScript • REST APIs • Accessibility (WCAG)",
    projectHref: "/github",
    codeHref: "https://github.com/dannymckinney88/Frontend-Portfolio",
  },
  {
    title: "Todo App",
    description:
      "A responsive task management app demonstrating state management, drag-and-drop interactions, and persistent client-side storage.",
    features: [
      "Full CRUD operations for task management",
      "Drag-and-drop reordering with intuitive UI feedback",
      "Filtering for active and completed tasks",
      "Local storage persistence for session continuity",
    ],
    stack: "React • TypeScript • Shadcn UI • Accessibility (WCAG)",
    projectHref: "/todo",
    codeHref: "https://github.com/dannymckinney88/Frontend-Portfolio",
  },
  {
    title: "Counter App",
    description:
      "Simple counter demonstrating React state and component composition.",
    features: [
      "State management using React hooks",
      "Reusable and composable UI components",
      "Accessible button interactions and keyboard support",
    ],
    stack: "React • TypeScript",
    projectHref: "/counter",
    codeHref: "https://github.com/dannymckinney88/Frontend-Portfolio",
  },
];
