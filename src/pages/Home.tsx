import { Link } from 'react-router-dom';

import StrengthCard from '@/components/common/StrengthCard';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectData } from '@/components/projects/projectData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Display the homepage
 */
function Home() {
  /**
   * Smooth scroll to projects section with offset
   */
  const handleProjectsClick = () => {
    const section = document.getElementById('projects');

    if (!section) return;

    const yOffset = -140;
    const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="page-stack">
      {/* Hero */}
      <section className="mx-auto max-w-4xl py-10 text-center sm:py-14">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Frontend Developer
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Danny McKinney
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          Frontend developer building accessible, production-ready React applications with
          strong TypeScript foundations, reusable UI architecture, and polished user
          experiences.
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          4+ years delivering enterprise fintech interfaces across client, advisor, and
          internal platforms, with hands-on experience in ADA / WCAG compliance and
          scalable frontend systems.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={handleProjectsClick}>View Projects</Button>

          <Button variant="outline" asChild>
            <Link to="/github">View Live Demo</Link>
          </Button>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            4+ Years Enterprise Experience
          </span>
          <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            ADA / WCAG Focused
          </span>
          <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            React + TypeScript
          </span>
          <span className="rounded-full border border-border/70 bg-muted px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            Fintech Product Delivery
          </span>
        </div>
      </section>

      {/* About (NOT a card – keeps layout breathing) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-0">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            About
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">
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

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            I focus on delivering experiences that feel predictable and polished, where
            users always understand what’s happening.
          </p>
        </div>
      </section>

      {/* Strengths (Cards) */}
      <section className="section-stack" aria-labelledby="strengths-heading">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Strengths
          </p>
          <h2 id="strengths-heading" className="text-2xl font-semibold tracking-tight">
            What I focus on
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
      <section id="projects" className="section-stack" aria-labelledby="projects-heading">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Featured Work
          </p>
          <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Selected projects demonstrating frontend fundamentals, accessible UI patterns,
            and production-ready React architecture.
          </p>
        </div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projectData.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* Contact (Card – strong CTA) */}
      <section id="contact" className="section-stack" aria-labelledby="contact-heading">
        <Card className="border-border/70 shadow-sm">
          <CardContent className="px-6 py-8 text-center sm:px-8">
            <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">
              Let’s connect
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              I’m looking for frontend opportunities where accessibility, polished UI, and
              production-minded React engineering are valued.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <a
                  href="https://github.com/dannymckinney88"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                </a>
              </Button>

              <Button variant="outline" onClick={handleProjectsClick}>
                View Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Home;
