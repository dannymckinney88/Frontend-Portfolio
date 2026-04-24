import { cn } from '@/lib/utils';

import { signalItems } from './heroData';

export const HeroSignalPanel = () => {
  return (
    <aside
      aria-label="Engineer profile"
      className="hidden self-start rounded-lg border border-hero-border bg-hero-panel-bg p-5 lg:mt-9 lg:block"
    >
      <dl className="divide-y divide-hero-divider">
        {signalItems.map(({ term, def, accent }) => (
          <div
            key={term}
            className="grid grid-cols-[72px_1fr] items-start gap-3 py-3 first:pt-0 last:pb-0"
          >
            <dt className="pt-px font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {term}
            </dt>
            <dd
              className={cn(
                'font-mono text-[11px] leading-[1.55] text-foreground/75',
                accent && 'font-semibold text-hero-accent',
              )}
            >
              {def}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
};
