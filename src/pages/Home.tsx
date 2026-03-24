import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin } from 'lucide-react';

import StrengthCard from '@/components/common/StrengthCard';
import FeaturedProjectCard from '@/components/projects/FeaturedProjectCard';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectData } from '@/components/projects/projectData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics';

const qualifications = [
  '4+ Years Enterprise Experience',
  'ADA / WCAG Focused',
  'React + TypeScript',
];

function Home() {
  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('featured-project');
      if (el) {
        const yOffset = -10;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        el.focus({ preventScroll: true }); // move focus after scroll
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
    <div className="page-stack">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-18 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Frontend Developer • Accessibility-Focused
        </p>

        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Danny McKinney
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-foreground sm:text-2xl">
          Building accessible, production-ready frontend experiences for real-world
          products.
        </p>

        <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          4+ years delivering enterprise fintech interfaces across complex client-facing
          platforms, with hands-on experience in React, TypeScript, ADA / WCAG compliance,
          and scalable UI systems.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link
              to="/accessibility-audit"
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

          <Button variant="outline" asChild size="lg">
            <a href="#featured-project" onClick={handleProjectsClick}>
              View Portfolio
            </a>
          </Button>
        </div>

        <ul
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          aria-label="Key qualifications"
        >
          {qualifications.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/70 bg-muted px-3 py-1 text-xs text-muted-foreground sm:text-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>

      {/* Featured ADA Project */}
      {featuredProject ? (
        <section
          id="featured-project"
          className="mx-auto w-full max-w-6xl px-4 pt-4 sm:pt-6 lg:pt-6"
          aria-labelledby="featured-project-heading"
          tabIndex={-1}
        >
          <div className="section-stack">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Featured Project
              </p>
              <h3
                id="featured-project-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Accessibility Audit Tool
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                A real scan workflow built to surface WCAG issues clearly, prioritize
                severity, and present actionable findings in a developer-friendly
                interface.
              </p>
            </div>

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
        className="app-shell section-stack scroll-mt-36 pt-2"
        aria-labelledby="projects-heading"
      >
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Supporting Work
          </p>
          <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight">
            More Projects
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Additional work showing API-driven UI, reusable components, and practical
            React fundamentals.
          </p>
        </div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {supportingProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="app-shell pt-2">
        <div className="max-w-4xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            About
          </p>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Building enterprise frontend systems with accessibility at the core
          </h2>

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            I’m a frontend developer with 4+ years of experience building enterprise web
            applications in fintech.
          </p>

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            I build interfaces that are resilient, accessible, and designed for real-world
            use — handling edge cases, managing UI states, and creating components that
            scale across teams and products.
          </p>
        </div>
      </section>

      {/* Strengths */}
      <section
        className="app-shell section-stack pt-4"
        aria-labelledby="strengths-heading"
      >
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Strengths
          </p>
          <h2 id="strengths-heading" className="text-2xl font-semibold tracking-tight">
            What I focus on
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
          <StrengthCard
            title="Accessible UI"
            description="Experience building interfaces with WCAG awareness, keyboard usability, and clearer interaction patterns."
          />
          <StrengthCard
            title="React + TypeScript"
            description="Comfortable building component-based applications with predictable state, typed props, and scalable structure."
          />
          <StrengthCard
            title="API-Driven Interfaces"
            description="Focused on resilient UI flows including loading, error, empty, and success states for real-world data fetching."
          />
          <StrengthCard
            title="Reusable Components"
            description="I prefer clean, repeatable UI patterns that make interfaces easier to scale, maintain, and reason about."
          />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="app-shell section-stack pt-8"
        aria-labelledby="contact-heading"
      >
        <Card className="border-border/70 shadow-sm">
          <CardContent className="px-6 py-8 text-center sm:px-8 sm:py-10">
            <h2
              id="contact-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Let’s build accessible, polished frontend experiences
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              I’m looking for frontend opportunities where accessibility, strong UI craft,
              and production-minded React engineering are genuinely valued.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <a
                  href="/danny-mckinney-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume PDF"
                  onClick={() =>
                    trackEvent('click_contact_cta', {
                      target: 'resume',
                      location: 'footer',
                    })
                  }
                >
                  <FileText aria-hidden="true" />
                  View Resume
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a
                  href="https://www.linkedin.com/in/danny-mckinney/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('click_contact_cta', {
                      target: 'linkdin',
                      location: 'footer',
                    })
                  }
                >
                  <Linkedin aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a
                  href="https://github.com/dannymckinney88"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('click_contact_cta', {
                      target: 'github',
                      location: 'footer',
                    })
                  }
                >
                  <Github aria-hidden="true" />
                  GitHub
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Home;
