export const heroStats = [
  { value: '5', label: 'Years frontend' },
  { value: 'WCAG 2.2', label: 'AA conformance' },
  { value: '5', label: 'Enterprise fintech' },
  { value: '30+', label: 'Enterprise UI flows' },
] as const;

export const signalItems: Array<{ term: string; def: string; accent?: boolean }> = [
  { term: 'role', def: 'Frontend Engineer' },
  { term: 'focus', def: 'React · TypeScript · a11y' },
  { term: 'domain', def: 'Data-heavy product UI' },
  { term: 'wcag', def: '2.2 AA baseline' },
  { term: 'stack', def: 'React 18 · TS 5 · Next.js · Tailwind · TanStack · Radix' },
  { term: 'status', def: 'Accepting work', accent: true },
];
