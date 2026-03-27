import type { ProjectCardProps } from './ProjectCard';

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
    projectHref: '/accessibility-audit',
    codeHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
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
    projectHref: 'https://react-ts-form-validation.vercel.app/',
    codeHref: 'https://github.com/dannymckinney88/react-ts-form-validation',
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
    projectHref: '/todos',
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
