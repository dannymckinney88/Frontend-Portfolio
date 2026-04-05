import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { FileText, Github, Linkedin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import FeaturedProjectCard from '@/features/homePage/Components/FeaturedProjectCard';
import ProjectCard from '@/features/homePage/Components/ProjectCard';
import { projectData } from '@/features/homePage/Components/projectData';
import { trackEvent } from '@/lib/analytics';
import type { RouteDefinition } from '@/lib/routes';
import { routePaths, socialLinks } from '@/lib/routes';

// Maps each social link label to its icon component.
// Icons live here rather than in routes.ts to keep the data file free of React imports.
const socialLinkIcons: Record<string, LucideIcon> = {
  'View Resume': FileText,
  LinkedIn: Linkedin,
  GitHub: Github,
};

const strengths = [
  {
    title: 'Data-Heavy UI',
    description:
      'Designing and building dense table interfaces, complex filter systems, and workflow-driven layouts that stay performant and usable at scale.',
  },
  {
    title: 'React + TypeScript',
    description:
      'Component architecture with explicit types, predictable state, and patterns that hold up as codebases grow — not just working code, but maintainable code.',
  },
  {
    title: 'Accessible UI',
    description:
      'Keyboard navigation, screen reader workflows, and WCAG implementation built into the architecture — not retrofitted after the fact.',
  },
  {
    title: 'API-Driven Interfaces',
    description:
      'Resilient UI flows that handle loading, error, empty, and success states correctly — because real data is never clean or predictable.',
  },
];

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
  const featuredProject = projectData.find((project) => project.title === 'AccessOps');

  const supportingProjects = projectData.filter(
    (project) => project.title !== 'AccessOps' && project.title !== 'Counter App',
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 md:pt-16 md:pb-28 lg:pt-20 "
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-section-label ">
          Frontend Engineer · Accessibility · Data-Heavy UI · Workflow Systems
        </p>

        <h1
          id="hero-heading"
          className="mt-5 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl "
        >
          Danny McKinney
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
          I build production-ready frontend systems designed for accessibility, clarity,
          and real-world user workflows.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            asChild
            size="lg"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={routePaths.accessOps}
              onClick={() =>
                trackEvent('click_accessops_cta', {
                  project_name: 'access_ops',
                  location: 'hero',
                })
              }
            >
              Explore AccessOps <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured ADA Project */}
      {/* Projects Zone */}
      <section className="bg-surface-subtle">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          {featuredProject ? (
            <section
              id="featured-project"
              aria-label="Featured project: AccessOps"
              tabIndex={-1}
            >
              <div className="flex flex-col gap-8 ">
                <SectionLabel>Flagship Project</SectionLabel>

                <FeaturedProjectCard
                  title={featuredProject.title}
                  description={featuredProject.description}
                  scope={featuredProject.scope}
                  highlights={featuredProject.features}
                  stack={featuredProject.stack}
                  projectHref={featuredProject.projectHref}
                  codeHref={featuredProject.codeHref}
                  imageSrc="/featured-project.png"
                  imageAlt="Accessibility operations dashboard showing summary metrics, issue risk, and remediation progress"
                />
              </div>
            </section>
          ) : null}

          <section
            id="supporting-projects"
            className="mx-auto w-full max-w-6xl px-4 pt-20 pb-14 sm:px-6 md:pt-24 md:pb-18"
            aria-labelledby="projects-heading"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <SectionLabel id="projects-heading">More Work</SectionLabel>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Additional projects that reflect how I think about frontend
                  architecture, usability, and real product behavior.
                </p>
              </div>

              <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {supportingProjects.map((project, i) => (
                  <ProjectCard key={project.title} {...project} index={i + 1} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* About + Strengths */}
      <section
        className="mx-auto w-full max-w-6xl px-4 pt-20 pb-14 sm:px-6 md:pt-24 md:pb-18"
        aria-labelledby="about-heading"
      >
        <div className="flex flex-col gap-8">
          <SectionLabel>About</SectionLabel>

          <div className="grid gap-10 lg:grid-cols-[45%_55%] lg:gap-16">
            {/* Left: heading + bio */}
            <div className="space-y-4">
              <h2
                id="about-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Building enterprise frontend systems with accessibility at the core.
              </h2>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I spent five years as the accessibility SME for a 30-page enterprise
                wealth platform, leading remediation of 900+ violations and reducing audit
                findings by two thirds.
              </p>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I build interfaces that hold up under real complexity — dense tables,
                complex filter states, keyboard and screen reader workflows — and I treat
                accessibility as an architecture decision, not a QA pass.
              </p>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                On the engineering side, I specialize in the frontend work that's hardest
                to get right — data-heavy tables, complex filter state, async data flows,
                and component architecture that scales without becoming a maintenance
                problem.
              </p>
            </div>

            {/* Right: strength list */}
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

      {/* Contact */}
      <section id="contact" className="bg-foreground" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-section-label-muted">
            Get in Touch
          </p>

          <h2
            id="contact-heading"
            className="mt-4 max-w-xl text-2xl font-semibold tracking-tight text-background sm:text-3xl"
          >
            Let’s connect
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-background/60 sm:text-base">
            Currently looking for frontend roles where accessibility and complex UI are
            first-class concerns, not afterthoughts.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socialLinks.map((link: RouteDefinition, index) => {
              const Icon = socialLinkIcons[link.label];
              const destination = link.externalHref ?? link.href;
              const isPrimary = index === 0;

              return (
                <Button
                  key={link.label}
                  asChild
                  size="lg"
                  variant={isPrimary ? 'default' : 'ghost'}
                  className={
                    isPrimary
                      ? undefined
                      : 'border border-background/30 text-background hover:bg-background/10 hover:text-background'
                  }
                >
                  <a
                    href={destination}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('click_contact_cta', {
                        target: link.label,
                        location: 'footer',
                      })
                    }
                  >
                    {Icon && <Icon aria-hidden="true" />}
                    {link.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
