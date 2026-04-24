import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

import { HeroSignalPanel } from './HeroSignalPanel';
import { HeroStats } from './HeroStats';

export const HomeHero = () => {
  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-hero-border bg-hero-bg"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-0 sm:px-6 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_290px] lg:gap-16 xl:gap-24">
          {/* Left: headline, sub, CTAs */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hero-accent">
              Frontend Engineer · Accessibility · Data-heavy UI · Workflow systems
            </p>

            <h1
              id="hero-heading"
              className="mt-5 text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Frontend systems,{' '}
              <span className="text-hero-accent">built to hold up in production.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Accessible React and TypeScript for teams that can't ship broken tables,
              broken forms, or inaccessible workflows. Production-ready UI for real-world
              complexity — built to WCAG&nbsp;2.2&nbsp;AA, tested with keyboard and screen
              reader on every ship.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="motion-safe:transition motion-safe:hover:-translate-y-0.5"
              >
                <a
                  href="#featured-project"
                  onClick={(event) => {
                    scrollToSection(event, 'featured-project');
                    trackEvent('click_flagship_cta', { location: 'hero' });
                  }}
                >
                  View flagship project <span aria-hidden="true">→</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="border border-foreground/25 text-foreground hover:bg-foreground/8 hover:text-foreground"
              >
                <a
                  href="#supporting-projects"
                  onClick={(event) => {
                    scrollToSection(event, 'supporting-projects');
                    trackEvent('click_browse_work', { location: 'hero' });
                  }}
                >
                  Browse selected work
                </a>
              </Button>
            </div>
          </div>

          <HeroSignalPanel />
        </div>

        <HeroStats />
      </div>
    </section>
  );
};
