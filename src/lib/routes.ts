/**
 * Centralized route and navigation link definitions.
 *
 * This is the single source of truth for all internal paths and external URLs
 * used across the app. Import from here rather than hardcoding strings in
 * components or data files.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A navigational link with a primary href and an optional external URL.
 *
 * - href          — the primary destination (internal SPA path or full external URL)
 * - externalHref  — when present, this URL should open in a new browser tab
 */
export interface RouteDefinition {
  label: string;
  href: string;
  externalHref?: string;
}

/**
 * A nav bar link. Extends RouteDefinition with an optional section ID used
 * for same-page smooth-scroll behavior on the home route.
 */
export interface NavLinkDefinition extends RouteDefinition {
  scrollTargetId?: string;
}

/**
 * An app-level route entry registered in React Router.
 * path corresponds to the string used in <Route path="..." />.
 */
export interface AppRouteDefinition {
  label: string;
  path: string;
}

// ---------------------------------------------------------------------------
// Internal route path constants
//
// Use these anywhere an internal route path string is needed so a rename
// only requires a change in one place.
// ---------------------------------------------------------------------------

export const routePaths = {
  home: '/',
  accessibilityAudit: '/accessibility-audit',
  githubExplorer: '/github',
  todoApp: '/todos',
  counterApp: '/counter',
} as const;

// ---------------------------------------------------------------------------
// App-level routes
//
// Consumed by AppRoutes.tsx. The page component mapping lives there;
// this array provides the label and path data.
// ---------------------------------------------------------------------------

export const appRoutes: AppRouteDefinition[] = [
  { label: 'Home',                 path: routePaths.home },
  { label: 'Accessibility Audit',  path: routePaths.accessibilityAudit },
  { label: 'GitHub Explorer',      path: routePaths.githubExplorer },
  { label: 'Todo App',             path: routePaths.todoApp },
  { label: 'Counter App',          path: routePaths.counterApp },
];

// ---------------------------------------------------------------------------
// Nav bar links
//
// Consumed by Navbar.tsx. scrollTargetId drives same-page anchor scroll
// when the user is already on the home route.
// ---------------------------------------------------------------------------

export const navLinks: NavLinkDefinition[] = [
  {
    label: 'Home',
    href: routePaths.home,
  },
  {
    label: 'Projects',
    href: `${routePaths.home}#featured-project`,
    scrollTargetId: 'featured-project',
  },
  {
    label: 'Contact',
    href: `${routePaths.home}#contact`,
    scrollTargetId: 'contact',
  },
];

// ---------------------------------------------------------------------------
// Project links
//
// href is the primary demo destination (internal SPA route or live URL).
// externalHref is the source code repository, which opens in a new tab.
// Consumed by projectData.ts for the projectHref and codeHref fields.
// ---------------------------------------------------------------------------

export const projectLinks: RouteDefinition[] = [
  {
    label: 'Accessibility Audit Tool',
    href: routePaths.accessibilityAudit,
    externalHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
  {
    label: 'User Management — Accessible Form Handling',
    href: 'https://react-ts-form-validation.vercel.app/',
    externalHref: 'https://github.com/dannymckinney88/react-ts-form-validation',
  },
  {
    label: 'GitHub Repository Explorer',
    href: routePaths.githubExplorer,
    externalHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
  {
    label: 'Todo App',
    href: routePaths.todoApp,
    externalHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
  {
    label: 'Counter App',
    href: routePaths.counterApp,
    externalHref: 'https://github.com/dannymckinney88/Frontend-Portfolio',
  },
];

// ---------------------------------------------------------------------------
// Social / contact links
//
// All of these open in a new browser tab. externalHref is set on every entry.
// Consumed by the Contact CTA section in Home.tsx.
// ---------------------------------------------------------------------------

export const socialLinks: RouteDefinition[] = [
  {
    label: 'View Resume',
    href: '/danny-mckinney-resume.pdf',
    externalHref: '/danny-mckinney-resume.pdf',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/danny-mckinney/',
    externalHref: 'https://www.linkedin.com/in/danny-mckinney/',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/dannymckinney88',
    externalHref: 'https://github.com/dannymckinney88',
  },
];
