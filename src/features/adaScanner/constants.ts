import type { AuditImpact } from './types';

export const IMPACT_STYLES = {
  critical: {
    card: 'border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/30',
    label: 'text-red-700 dark:text-red-400',
    badge:
      'border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400',
  },
  serious: {
    card: 'border-orange-200 bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/30',
    label: 'text-orange-700 dark:text-orange-400',
    badge:
      'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-400',
  },
  moderate: {
    card: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/40 dark:bg-yellow-950/30',
    label: 'text-yellow-700 dark:text-yellow-400',
    badge:
      'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/40 dark:bg-yellow-950/30 dark:text-yellow-400',
  },
  minor: {
    card: 'border-border/70 bg-muted/30',
    label: 'text-foreground',
    badge: 'border-border/70 bg-muted text-muted-foreground',
  },
} as const;

export const IMPACT_ORDER: Record<Exclude<AuditImpact, null>, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3,
};
