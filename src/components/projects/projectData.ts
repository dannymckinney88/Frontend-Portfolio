import type { ProjectCardProps } from './ProjectCard';

/**
 * Portfolio project data
 */
export const projectData: ProjectCardProps[] = [
  {
    title: 'GitHub Repository Explorer',
    description:
      'An API-driven interface for repository search, pagination, caching, and resilient UI states.',
    features: [
      'GitHub REST API integration with username-based repository browsing',
      'Loading, empty, and error states for realistic data-fetching flows',
      'Local storage caching scoped by username to reduce redundant API calls',
    ],
    stack: ['React', 'TypeScript', 'REST API', 'Accessibility'],
    projectHref: '/github',
    codeHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
  {
    title: 'Todo App',
    description:
      'A task management interface focused on CRUD actions, filtering, drag-and-drop, and local persistence.',
    features: [
      'Full CRUD interactions for creating and managing tasks',
      'Drag-and-drop reordering with clear visual feedback',
      'Local storage persistence to preserve state across sessions',
    ],
    stack: ['React', 'TypeScript', 'Shadcn UI', 'Accessibility'],
    projectHref: '/todo',
    codeHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
  {
    title: 'Counter App',
    description:
      'A lightweight React project demonstrating predictable state updates, component composition, and accessible UI patterns.',
    features: [
      'Predictable state updates with clear user feedback',
      'Reusable components that support clean composition',
      'Accessible button interactions with keyboard support',
    ],
    stack: ['React', 'TypeScript', 'Accessibility'],
    projectHref: '/counter',
    codeHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
];
