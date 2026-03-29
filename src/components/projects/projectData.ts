import { projectLinks } from '@/lib/routes';

import type { ProjectCardProps } from './ProjectCard';

/**
 * Look up a project's link definition by title.
 * Throws in development if the title drifts out of sync with routes.ts.
 */
function getProjectLinks(title: string): { projectHref: string; codeHref: string } {
  const match = projectLinks.find((link) => link.label === title);

  if (!match) {
    throw new Error(
      `projectData: no entry found in projectLinks for "${title}". ` +
        'Add a matching entry to src/lib/routes.ts.',
    );
  }

  return {
    projectHref: match.href,
    codeHref: match.externalHref ?? '',
  };
}

/**
 * Portfolio project data
 */
export const projectData: ProjectCardProps[] = [
  {
    title: 'Accessibility Audit Tool',
    description:
      'Full-stack accessibility audit tool using Playwright and axe-core to scan live sites and surface actionable WCAG remediation insights.',
    features: [
      'Runs real page audits with a Node/Express backend using Playwright and axe-core',
      'Displays violations, severity breakdowns, passed checks, and affected DOM nodes',
      'Built with accessible form flows, live region announcements, focus management, and clear error handling',
    ],
    stack: ['React', 'TypeScript', 'Express', 'Playwright', 'axe-core', 'Accessibility'],
    ...getProjectLinks('Accessibility Audit Tool'),
  },
  {
    title: 'User Management — Accessible Form Handling',
    description:
      'A production-minded React + TypeScript app demonstrating WCAG 2.1 compliant form validation, modal focus trapping, and screen reader support. Lighthouse accessibility score: 100, zero axe violations.',
    features: [
      'Accessible modal with focus trap, Escape key handling, and focus return to trigger element',
      'Form validation with aria-invalid, aria-describedby, and role="alert" error announcements',
      'Screen reader tested with NVDA — success messages, loading states, and empty states all announced correctly',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'WCAG 2.1', 'Accessibility'],
    ...getProjectLinks('User Management — Accessible Form Handling'),
  },
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
    ...getProjectLinks('GitHub Repository Explorer'),
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
    ...getProjectLinks('Todo App'),
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
    ...getProjectLinks('Counter App'),
  },
];
