import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { FileText, Github, Linkedin } from 'lucide-react';

import FeaturedProjectCard from '@/components/projects/FeaturedProjectCard';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectData } from '@/components/projects/projectData';
import { Button } from '@/components/ui/button';
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
      'Experience building interfaces with WCAG awareness, keyboard usability, and clearer interaction patterns.',
  },
  {
    title: 'React + TypeScript',
    description:
      'Comfortable building component-based applications with predictable state, typed props, and scalable structure.',
  },
  {
    title: 'API-Driven Interfaces',
    description:
      'Focused on resilient UI flows including loading, error, empty, and success states for real-world data fetching.',
  },
  {
    title: 'Reusable Components',
    description:
      'I prefer clean, repeatable UI patterns that make interfaces easier to scale, maintain, and reason about.',
  },
];

function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-center gap-4">
      <p id={id} className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-section-label">
        {children}
      </p>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Home() {
  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('featured-project');
      if (el) {
        const yOffset = -10;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        el.focus({ preventScroll: true });
      }
    }
  };

  const featuredProject = projectData.find(
    (project) => project.title === 'Accessibility Audit Tool',
  );

  const supportingProjects = projectData.filter(
    (project) =>
      project.title !== 'Accessibility Audit Tool' && project.title !== 'Counter App',
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-section-label">
          Frontend Developer · Accessibility Focused
        </p>

        <h1 id="hero-heading" className="mt-5 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          Danny McKinney
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
          Building accessible, production-ready frontend experiences for real-world
          products.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link
              to={routePaths.accessibilityAudit}
              onClick={() =>
                trackEvent('click_audit_cta', {
                  project_name: 'ada_audit_tool',
                  location: 'homepage',
                })
              }
            >
              Launch Audit Tool
            </Link>
          </Button>

          <Button variant="ghost" asChild size="lg">
            <a href="#featured-project" onClick={handleProjectsClick}>
              View Portfolio
            </a>
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
              description="Run live accessibility scans on real websites and review WCAG issues in a clear, developer-friendly workflow."
              highlights={[
                'Scans live pages with a Playwright + axe-core backend',
                'Surfaces violations, severity breakdowns, and actionable guidance',
                'Built with accessible form flows, live announcements, and focus-aware UI states',
              ]}
              stack={featuredProject.stack}
              projectHref={featuredProject.projectHref}
              codeHref={featuredProject.codeHref}
              imageSrc="/ada-featured-preview.png"
              imageAlt="Accessibility audit tool results showing summary metrics, severity filters, and an expanded WCAG violation card"
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
            <p
              className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
            >
              Additional work showing API-driven UI, reusable components, and practical
              React fundamentals.
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
                Building enterprise frontend systems with accessibility at the core
              </h2>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I'm a frontend developer with 4+ years of experience building enterprise
                web applications in fintech.
              </p>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I build interfaces that are resilient, accessible, and designed for
                real-world use — handling edge cases, managing UI states, and creating
                components that scale across teams and products.
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-section-label">
            Get in Touch
          </p>

          <h2
            id="contact-heading"
            className="mt-4 max-w-xl text-2xl font-semibold tracking-tight text-background sm:text-3xl"
          >
            Let's build accessible, polished frontend experiences
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-background/60 sm:text-base">
            I'm looking for frontend opportunities where accessibility, strong UI craft,
            and production-minded React engineering are genuinely valued.
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
