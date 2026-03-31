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
    title: 'AccessOps',
    description:
      'Accessibility operations platform for managing audit-driven remediation — tracking issues across audits, triaging work, and verifying real fixes.',

    features: [
      'Surfaces highest-risk properties and unresolved critical issues to drive immediate triage decisions',
      'Triage workspace built for real remediation workflows — severity, ownership, and status in one view',
      'Scans view tracks audit history and regressions, showing progress across properties over time',
      'Issues persist until verified by a human — not auto-closed by a scanner rescan',
      'Designed for teams where accessibility is ongoing work, not a one-time audit deliverable',
    ],

    stack: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind',
      'TanStack Table',
      'Accessibility',
    ],

    ...getProjectLinks('AccessOps'),
  },
  {
    title: 'Accessibility Audit Tool',
    description:
      'Full-stack accessibility audit tool using Playwright and axe-core to scan live sites and surface actionable WCAG remediation insights.',
    features: [
      'Run accessibility scans on real websites and review WCAG issues in a clear, developer-focused workflow.',
      'Displays violations, severity breakdowns, passed checks, and affected DOM nodes',
      'Built with accessible form flows, live region announcements, focus management, and clear error handling',
      'Designed to mirror real audit → remediation workflows used in enterprise accessibility programs.',
    ],
    stack: ['React', 'TypeScript', 'Express', 'Playwright', 'axe-core', 'Accessibility'],
    ...getProjectLinks('Accessibility Audit Tool'),
  },
  {
    title: 'Accessible Form Handling',
    description:
      'A React + TypeScript app focused on accessible form patterns, including validation, modal focus management, and screen reader support. Achieved Lighthouse accessibility score of 100 with zero axe violations.',
    features: [
      'Accessible modal with focus trap, Escape key handling, and focus return to trigger element',
      'Form validation with aria-invalid, aria-describedby, and role="alert" error announcements',
      'Screen reader tested with NVDA — success messages, loading states, and empty states all announced correctly',
    ],
    stack: ['React', 'TypeScript', 'WCAG 2.1', 'Accessibility'],
    ...getProjectLinks('Accessible Form Handling'),
  },
  {
    title: 'GitHub Repository Explorer',
    description:
      'API-driven interface for repository search with pagination, caching, and resilient UI states.',
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
      'Task management interface with filtering, drag-and-drop, and local persistence, focused on clean state handling and UI interaction patterns.',
    features: [
      'Full CRUD interactions for creating and managing tasks',
      'Drag-and-drop reordering with clear visual feedback',
      'Local storage persistence to preserve state across sessions',
    ],
    stack: ['React', 'TypeScript', 'Shadcn UI', 'Accessibility'],
    ...getProjectLinks('Todo App'),
  },
];
