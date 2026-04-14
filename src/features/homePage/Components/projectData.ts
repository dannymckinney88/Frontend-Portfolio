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
    title: 'HeelFlow',
    description:
      'Mobile-first workflow platform for private dog trainers to manage clients, send structured lesson recaps, and keep homework and follow-up communication connected to each session.',

    scope:
      'Client management, trainer-facing session workflows, client recap pages, homework tracking, templates, and session messaging.',

    features: [
      'Trainer workflow for creating structured session recaps with notes, homework, and step-by-step training guidance',
      'Secure magic-link recap pages that let clients review lessons and track homework without needing an account',
      'Per-session messaging threads that reduce off-platform texting and keep follow-up tied to the right context',
      'Reusable templates for consistent training plans and faster session creation',
      'Mobile-first UX with accessibility-minded focus management and interaction design across key flows',
    ],

    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Accessibility',
    ],

    ...getProjectLinks('HeelFlow'),
  },
  {
    title: 'AccessOps',
    description:
      'System for managing accessibility remediation at scale, designed to turn audit results into actionable workflows across teams and scan cycles.',

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
      'Scans live websites and surfaces actionable WCAG issues, designed to support real audit-to-remediation workflows instead of just generating reports.',

    scope:
      'Built to mirror how accessibility audits actually flow, bridging automated detection with developer-focused remediation.',

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
      'Explores production-ready accessible form patterns, including validation, modal focus management, and screen reader behavior, with a focus on real user workflows, not just passing audits.',

    scope:
      'Focused on real-world accessibility patterns for forms, modals, and validation flows used in production applications.',

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
      'Data-heavy interface for exploring repositories with pagination, caching, and resilient UI states, focused on handling async data and edge cases cleanly.',

    scope:
      'Focused on handling async data, caching strategies, and resilient UI states in data-driven interfaces where failure states matter as much as success.',

    features: [
      'GitHub REST API integration with username-based repository browsing',
      'Loading, empty, and error states for realistic data-fetching flows',
      'Local storage caching scoped by username to reduce redundant API calls',
    ],

    stack: ['React', 'TypeScript', 'REST API'],

    ...getProjectLinks('GitHub Repository Explorer'),
  },
];
