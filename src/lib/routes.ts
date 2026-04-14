/**
 * A navigational link with a primary href and an optional external URL.
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

export const routePaths = {
  home: '/',
  heelFlow: 'https://heelflow-xi.vercel.app/',
  accessOps: 'https://accessops.vercel.app/dashboard',
  accessibilityAudit: '/accessibility-audit',
  formValidation: 'https://react-ts-form-validation.vercel.app/',
  githubExplorer: '/github',
  todoApp: '/todos',
  counterApp: '/counter',
  writing: '/writing',
} as const;

export const appRoutes: AppRouteDefinition[] = [
  { label: 'Home', path: routePaths.home },
  { label: 'HeelFlow', path: routePaths.heelFlow },
  { label: 'AccessOps', path: routePaths.accessOps },
  { label: 'Accessibility Audit', path: routePaths.accessibilityAudit },
  { label: 'Accessible Form Handling', path: routePaths.formValidation },
  { label: 'GitHub Explorer', path: routePaths.githubExplorer },
];

export const navLinks: NavLinkDefinition[] = [
  {
    label: 'Home',
    href: routePaths.home,
  },
  {
    label: 'Projects',
    href: `${routePaths.home}#supporting-projects`,
    scrollTargetId: 'supporting-projects',
  },
  {
    label: 'Writing',
    href: routePaths.writing,
  },
  {
    label: 'Contact',
    href: `${routePaths.home}#contact`,
    scrollTargetId: 'contact',
  },
];

export const projectLinks: RouteDefinition[] = [
  {
    label: 'HeelFlow',
    href: routePaths.heelFlow,
    externalHref: 'https://github.com/dannymckinney88/heelflow',
  },
  {
    label: 'AccessOps',
    href: routePaths.accessOps,
    externalHref: 'https://github.com/dannymckinney88/accessops',
  },
  {
    label: 'Accessibility Audit Tool',
    href: routePaths.accessibilityAudit,
    externalHref:
      'https://github.com/dannymckinney88/Frontend-Portfolio/tree/main/src/features/adaScanner',
  },
  {
    label: 'Accessible Form Handling',
    href: routePaths.formValidation,
    externalHref: 'https://github.com/dannymckinney88/react-ts-form-validation',
  },
  {
    label: 'GitHub Repository Explorer',
    href: routePaths.githubExplorer,
    externalHref:
      'https://github.com/dannymckinney88/Frontend-Portfolio/tree/main/src/features/githubExplorer',
  },
];

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
