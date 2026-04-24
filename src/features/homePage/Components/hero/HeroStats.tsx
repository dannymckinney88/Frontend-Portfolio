import { cn } from '@/lib/utils';

import { heroStats } from './heroData';

const getHeroStatClassName = (index: number) => {
  return cn(
    'py-9 md:py-10',
    index % 2 === 0 ? 'pr-6' : 'pl-6',
    index % 2 === 0 && 'border-r border-hero-divider',
    index < 2 && 'border-b border-hero-divider md:border-b-0',
    index === 0 && 'md:pr-8 md:pl-0',
    index === 1 && 'md:px-8 md:border-r md:border-hero-divider',
    index === 2 && 'md:px-8',
    index === 3 && 'md:pl-8 md:pr-0',
  );
};

export const HeroStats = () => {
  return (
    <div className="mt-14 border-t border-hero-divider sm:mt-16">
      <dl className="grid grid-cols-2 md:grid-cols-4">
        {heroStats.map((stat, index) => (
          <div key={stat.label} className={getHeroStatClassName(index)}>
            <dd className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {stat.value}
            </dd>
            <dt className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
};
