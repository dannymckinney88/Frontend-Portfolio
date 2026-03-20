import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin } from 'lucide-react';

import StrengthCard from '@/components/common/StrengthCard';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectData } from '@/components/projects/projectData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const qualifications = [
  '4+ Years Enterprise Experience',
  'ADA / WCAG Focused',
  'React + TypeScript',
];

function Home() {
  /**
   * Smooth scroll to projects section with offset
   *
   */
  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-stack">
      {/* Hero */}
      <section className="mx-auto max-w-6xl py-14 text-center sm:py-18 lg:py-24">
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
            <a href="#projects" onClick={handleProjectsClick}>
              View Projects
            </a>
          </Button>

          <Button variant="outline" asChild size="lg">
            <Link to="/accessibility-audit">View Live Demo</Link>
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

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 pt-2 sm:px-0">
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
            scale across teams and products. I focus on delivering experiences that feel
            predictable and polished, where users always understand what’s happening.
          </p>
        </div>
      </section>

      {/* Strengths */}
      <section className="section-stack pt-4" aria-labelledby="strengths-heading">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Strengths
          </p>
          <h2 id="strengths-heading" className="text-2xl font-semibold tracking-tight">
            What I focus on
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4">
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

      {/* Projects */}
      <section
        id="projects"
        className="section-stack scroll-mt-36 pt-6"
        aria-labelledby="projects-heading"
      >
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Featured Work
          </p>
          <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Selected work highlighting accessible UI patterns, frontend fundamentals, and
            production-minded React architecture.
          </p>
        </div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projectData.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="section-stack pt-8"
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
