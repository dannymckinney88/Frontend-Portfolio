import { Link, useLocation } from 'react-router-dom';
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
    title: 'Accessible UI',
    description:
      'Built interfaces with real keyboard support, screen reader usability, and practical WCAG implementation — not just audit compliance.',
  },
  {
    title: 'React + TypeScript',
    description:
      'Building component-based applications with predictable state, strong typing, and scalable structure.',
  },
  {
    title: 'API-Driven Interfaces',
    description:
      'Designing resilient UI flows for real-world data — including loading, error, empty, and success states.',
  },
  {
    title: 'Complex UI Workflows',
    description:
      'Building interfaces that handle edge cases, multiple states, and real user flows without falling apart under complexity.',
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
  const location = useLocation();

  const handleProjectsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') return;

    event.preventDefault();

    const section = document.getElementById('featured-project');
    if (!section) return;

    const yOffset = -10;
    const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const featuredProject = projectData.find((project) => project.title === 'AccessOps');

  const supportingProjects = projectData.filter(
    (project) => project.title !== 'AccessOps' && project.title !== 'Counter App',
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:py-20"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-section-label ">
          FRONTEND ENGINEER · ACCESSIBILITY · DATA-HEAVY UI · WORKFLOW SYSTEMS
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
      {featuredProject ? (
        <section
          id="featured-project"
          className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 md:pb-18"
          aria-label="Featured project: Accessibility Audit Tool"
          tabIndex={-1}
        >
          <div className="flex flex-col gap-6">
            <SectionLabel>Featured Work</SectionLabel>

            <FeaturedProjectCard
              title={featuredProject.title}
              description={featuredProject.description}
              highlights={featuredProject.features}
              stack={featuredProject.stack}
              projectHref={featuredProject.projectHref}
              codeHref={featuredProject.codeHref}
              imageSrc="/featured-project.png"
              imageAlt="Accessibility audit dashboard showing summary metrics, and violation risks"
            />
          </div>
        </section>
      ) : null}

      {/* Supporting Projects */}
      <section
        id="supporting-projects"
        className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 md:pb-18"
        aria-labelledby="projects-heading"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <SectionLabel id="projects-heading">More Work</SectionLabel>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Additional projects that reflect how I think about frontend architecture,
              usability, and real product behavior.
            </p>
          </div>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {supportingProjects.map((project, i) => {
              return <ProjectCard key={project.title} {...project} index={i + 1} />;
            })}
          </div>
        </div>
      </section>

      {/* About + Strengths */}
      <section
        className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 md:pb-18"
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
                I’m a frontend developer with 4+ years of experience building data-heavy
                web applications in fintech.
              </p>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I focus on building interfaces that stay usable under real-world
                complexity — handling edge cases, supporting keyboard and screen reader
                workflows, and creating UI patterns that scale across teams and products.
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
            I’m open to frontend roles focused on React, TypeScript, accessibility, and
            real product UI.
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
