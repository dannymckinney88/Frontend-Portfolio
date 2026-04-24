import { FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import FeaturedProjectCard from '@/features/homePage/Components/FeaturedProjectCard';
import FlagshipCard from '@/features/homePage/Components/FlagshipCard';
import ProjectCard from '@/features/homePage/Components/ProjectCard';
import { projectData } from '@/features/homePage/Components/projectData';
import { trackEvent } from '@/lib/analytics';
import { routePaths } from '@/lib/routes';
import { cn } from '@/lib/utils';

const contactChannels = [
  {
    label: 'Email',
    href: 'mailto:hello@dannymckinney.dev',
    display: 'hello@dannymckinney.dev',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/dannymckinney88',
    display: 'github.com/dannymckinney88',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/danny-mckinney/',
    display: 'linkedin.com/in/danny-mckinney',
  },
] as const;

const heroStats = [
  { value: '5', label: 'Years frontend' },
  { value: 'WCAG 2.2', label: 'AA conformance' },
  { value: '5', label: 'Enterprise fintech' },
  { value: '30+', label: 'Enterprise UI flows' },
] as const;

const signalItems: Array<{ term: string; def: string; accent?: boolean }> = [
  { term: 'role', def: 'Frontend Engineer' },
  { term: 'focus', def: 'React · TypeScript · a11y' },
  { term: 'domain', def: 'Data-heavy product UI' },
  { term: 'wcag', def: '2.2 AA baseline' },
  { term: 'stack', def: 'React 18 · TS 5 · Next.js · Tailwind · TanStack · Radix' },
  { term: 'status', def: 'Accepting work', accent: true },
];

const flagshipHighlights = [
  {
    n: '01',
    title: 'Prioritizes what to fix next',
    body: 'Turns audit findings into a focused backlog of unfixed issues, critical risk, and high-impact remediation work.',
  },
  {
    n: '02',
    title: 'Makes large issue sets workable',
    body: 'Filters, grouping, bulk assignment, and keyboard-operable row actions keep hundreds of issues manageable.',
  },
  {
    n: '03',
    title: 'Reduces duplicate work',
    body: 'Surfaces repeated failures across pages so teams can fix shared patterns instead of treating every issue as isolated.',
  },
  {
    n: '04',
    title: 'Tracks remediation status',
    body: 'Separates Open, In Progress, Fixed, Verified, and Accepted Risk so teams know what is active, done, or awaiting validation.',
  },
] as const;

const flagshipMetrics = [
  { value: '900+', label: 'Issues modeled' },
  { value: '5', label: 'Workflow states' },
  { value: 'AA', label: 'WCAG target' },
  { value: '100%', label: 'Core Flows' },
] as const;

const flagshipStack = [
  'React 18',
  'TypeScript',
  'Next.js 14',
  'TanStack Table',
  'Tailwind',
  'Radix',
  'WCAG 2.2 AA',
];

const strengths = [
  {
    title: 'Accessibility',
    description:
      'WCAG 2.2 AA-minded frontend work across React and Angular UI, including keyboard flow, focus management, ARIA fixes, and screen reader behavior.',
  },
  {
    title: 'Data-heavy UI',
    description:
      'Tables, filter systems, bulk actions, optimistic updates, and dense workflows built for real data volumes, not demo states.',
  },
  {
    title: 'Design systems',
    description:
      'Token-based theming, reusable primitives, documented component behavior, and accessibility patterns that scale across product UI.',
  },
  {
    title: 'Product judgment',
    description:
      'Fintech-shaped. I read the spec, then I read the workflow. I push back when the design will break in production.',
  },
] as const;

function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-center gap-4">
      <p
        id={id}
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-section-label"
      >
        {children}
      </p>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Home() {
  const accessOpsProject = projectData.find((p) => p.title === 'AccessOps');
  const heelFlowProject = projectData.find((p) => p.title === 'HeelFlow');
  const supportingProjects = projectData.filter(
    (p) => p.title !== 'AccessOps' && p.title !== 'HeelFlow',
  );

  return (
    <div className="flex flex-col min-w-0">
      {/* ── Hero ── */}
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
                broken forms, or inaccessible workflows. Production-ready UI for
                real-world complexity — built to WCAG&nbsp;2.2&nbsp;AA, tested with
                keyboard and screen reader on every ship.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="motion-safe:transition motion-safe:hover:-translate-y-0.5"
                >
                  <a
                    href="#featured-project"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById('featured-project')
                        ?.scrollIntoView({ behavior: 'smooth' });
                      document
                        .getElementById('featured-project')
                        ?.focus({ preventScroll: true });
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
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById('supporting-projects')
                        ?.scrollIntoView({ behavior: 'smooth' });
                      trackEvent('click_browse_work', { location: 'hero' });
                    }}
                  >
                    Browse selected work
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: structured signal panel — desktop only */}
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
          </div>

          {/* Stats strip */}
          <div className="mt-14 border-t border-hero-divider sm:mt-16">
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    'py-9 md:py-10',
                    i % 2 === 0 ? 'pr-6' : 'pl-6',
                    i % 2 === 0 && 'border-r border-hero-divider',
                    i < 2 && 'border-b border-hero-divider md:border-b-0',
                    i === 0 && 'md:pr-8 md:pl-0',
                    i === 1 && 'md:px-8 md:border-r md:border-hero-divider',
                    i === 2 && 'md:px-8',
                    i === 3 && 'md:pl-8 md:pr-0',
                  )}
                >
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
        </div>
      </section>

      {/* ── Projects zone ── */}
      <>
        {/* Flagship */}
        {accessOpsProject ? (
          <section
            id="featured-project"
            aria-label="Flagship project: AccessOps"
            tabIndex={-1}
            className="scroll-mt-20 py-12 md:py-16 bg-surface-subtle"
          >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <div className="flex min-w-0 flex-col gap-8">
                <SectionLabel>Flagship Project</SectionLabel>

                <div className="min-w-0">
                  <FlagshipCard
                    eyebrow="ACCESSIBILITY REMEDIATION PLATFORM · 2026"
                    title="AccessOps"
                    lede="A system for managing accessibility remediation at scale — turning audit output into triaged, assignable work across teams and scan cycles."
                    highlights={[...flagshipHighlights]}
                    stack={flagshipStack}
                    metrics={[...flagshipMetrics]}
                    projectHref={accessOpsProject.projectHref}
                    codeHref={accessOpsProject.codeHref}
                    ctaPrimary="View live system"
                    ctaSecondary="Read case study"
                    ctaSecondaryHref={routePaths.writing}
                    imageSrc="/featured-project.png"
                    imageAlt="AccessOps dashboard showing accessibility issue risk levels, remediation status, and scan cycle summary"
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Strong secondary */}
        {heelFlowProject ? (
          <section
            id="featured-project-heelflow"
            aria-label="Featured project: HeelFlow"
            className="mt-16 scroll-mt-20 pb-12 md:mt-20 md:pb-16 bg-background"
          >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <div className="flex min-w-0 flex-col gap-8">
                <SectionLabel>Featured Product</SectionLabel>

                <div className="min-w-0">
                  <FeaturedProjectCard
                    title={heelFlowProject.title}
                    description={heelFlowProject.description}
                    scope={heelFlowProject.scope}
                    highlights={heelFlowProject.features.slice(0, 3)}
                    stack={heelFlowProject.stack}
                    projectHref={heelFlowProject.projectHref}
                    codeHref={heelFlowProject.codeHref}
                    eyebrow="Client workflow platform"
                    ctaLabel="Try live demo"
                    imageSrc="/heelflow-recap.png"
                    imageAlt="HeelFlow client recap page showing a dog photo, session summary, homework steps, and training progress"
                    imageVariant="plain"
                    showDemoAccess
                    demoCredentials={{
                      email: 'demo@heelflow.app',
                      password: 'HeelflowDemo1!',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* More Work */}
        <section
          id="supporting-projects"
          className="scroll-mt-20 pt-20 pb-14 md:pt-24 md:pb-18 bg-surface-subtle"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="flex min-w-0 flex-col gap-6">
              <div className="flex min-w-0 flex-col gap-2">
                <SectionLabel id="projects-heading">More Work</SectionLabel>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Additional projects that reflect how I approach frontend architecture,
                  usability, and real product behavior.
                </p>
              </div>

              <div className="grid min-w-0 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {supportingProjects.map((project, i) => (
                  <div key={project.title} className="min-w-0">
                    <ProjectCard {...project} index={i + 1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>

      {/* ── About + Strengths ── */}
      <section
        className="mx-auto w-full max-w-6xl px-4 pt-20 pb-14 sm:px-6 md:pt-24 md:pb-18 bg-background"
        aria-labelledby="about-heading"
      >
        <div className="flex flex-col gap-8">
          <SectionLabel>About</SectionLabel>

          <div className="grid gap-10 lg:grid-cols-[45%_55%] lg:gap-16">
            <div className="space-y-4">
              <h2
                id="about-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                I&apos;m a frontend engineer focused on the boring, load-bearing parts of
                product UI.
              </h2>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                Five years shipping frontend UI in enterprise fintech — the kind of
                software where a broken form or an inaccessible table is a compliance
                incident, not just a bug. That shaped how I work.
              </p>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I build frontend systems that don&apos;t fall over in production:
                accessible by default, keyboard-complete, tested against real data
                volumes, and documented well enough that the next engineer doesn&apos;t
                need to ask me what it does.
              </p>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I care about product context as much as code. The best component in the
                world is useless if it&apos;s solving the wrong problem.
              </p>
            </div>

            <div className="divide-y divide-border">
              {strengths.map((s) => (
                <div key={s.title} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="bg-foreground text-background dark:bg-surface-subtle dark:text-foreground"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-0 sm:px-6 md:pt-20">
          <div className="flex items-center gap-4 mb-6">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-background/80 dark:text-section-label">
              Get in touch
            </p>
            <div className="h-px flex-1 bg-background/20 dark:bg-border" />
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* Left: heading, paragraph, CTAs */}
            <div className="flex flex-col gap-8">
              <div>
                <h2
                  id="contact-heading"
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  Let&apos;s talk about your frontend.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-background/65 dark:text-muted-foreground sm:text-base">
                  Open to mid-level and senior frontend roles building accessible,
                  production-ready UI, along with short consulting engagements focused on
                  accessibility and data-heavy workflows. Based in Arizona;
                  remote-friendly across US timezones.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a
                    href="mailto:hello@dannymckinney.dev"
                    onClick={() =>
                      trackEvent('click_contact_cta', {
                        target: 'email',
                        location: 'footer',
                      })
                    }
                  >
                    hello@dannymckinney.dev <span aria-hidden="true">→</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="border border-background/30 text-background hover:bg-background/10 hover:text-background dark:border-border dark:text-foreground dark:hover:bg-muted"
                >
                  <a
                    href="/danny-mckinney-resume.pdf"
                    download
                    onClick={() =>
                      trackEvent('click_contact_cta', {
                        target: 'resume',
                        location: 'footer',
                      })
                    }
                  >
                    <FileText aria-hidden="true" />
                    Download resume <span aria-hidden="true">↓</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: channels card */}
            <div className="lg:pt-14">
              <div className="overflow-hidden rounded-lg border border-background/15 dark:border-border">
                <div className="border-b border-background/15 px-5 py-3 dark:border-border">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/55 dark:text-muted-foreground">
                    Channels
                  </p>
                </div>
                <ul className="divide-y divide-background/10 dark:divide-border">
                  {contactChannels.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={
                          channel.href.startsWith('mailto:')
                            ? undefined
                            : 'noopener noreferrer'
                        }
                        className="flex items-center justify-between gap-4 px-5 py-4 text-sm transition-colors hover:bg-background/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-background/40 dark:hover:bg-muted/50 dark:focus-visible:ring-ring"
                        onClick={() =>
                          trackEvent('click_contact_cta', {
                            target: channel.label,
                            location: 'footer_channels',
                          })
                        }
                      >
                        <span className="font-medium">{channel.label}</span>
                        <span className="font-mono text-xs text-background/45 dark:text-muted-foreground">
                          {channel.display}
                          <span aria-hidden="true" className="ml-1.5">
                            ↗
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer meta row */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mt-14 border-t border-background/20 py-6 dark:border-border">
            <div className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-background/70 dark:text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 · Danny McKinney</span>
              <span>Portfolio V2026.04 · Built in React, with intent</span>
              <span>Arizona · Remote</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
