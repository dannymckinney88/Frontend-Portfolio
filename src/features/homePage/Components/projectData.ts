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
      'Workflow system for managing accessibility remediation at scale — helping teams triage hundreds of issues, prioritize high-impact fixes, and track real progress across audits.',

    scope:
      'Dashboard, triage workspace, grouped issue views, audit history, and remediation detail drawer.',

    features: [
      'Decision-focused dashboard that surfaces current accessibility risk and directs teams to the highest-impact remediation work',
      'Table-first triage workspace designed to handle large issue sets with filtering, grouping, and assignment workflows',
      'Lifecycle model tracks real progress from Open → Verified instead of resetting work on each scan',
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
      'Full-stack audit tool that scans live websites and surfaces actionable WCAG issues — designed to support real audit-to-remediation workflows, not just detection.',

    features: [
      'Runs automated accessibility scans on live sites using Playwright and axe-core, returning structured, actionable violation data',
      'Surfaces severity, affected elements, and pass/fail results in a developer-focused review interface',
      'Implements accessible form patterns, live region announcements, and focus management for real-world usability',
      'Bridges detection and remediation by presenting results in a workflow aligned with enterprise accessibility audits',
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
];
