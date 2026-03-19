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
      <section className="mx-auto max-w-4xl py-8 text-center sm:py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Frontend Developer
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Danny McKinney
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          I build accessible, performant React applications with a strong focus on
          TypeScript, reusable UI architecture, and polished user experiences.
        </p>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          4+ years building enterprise fintech interfaces across client, advisor, and
          internal platforms, with hands-on experience in ADA / WCAG compliance and
          scalable frontend systems.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={handleProjectsClick}>View Projects</Button>

          <Button variant="outline" asChild>
            <a
              href="https://github.com/dannymckinney88"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* About (NOT a card – keeps layout breathing) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-0">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            About
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">
            Enterprise frontend experience with accessibility at the core
          </h2>

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            I’m a frontend developer with 4+ years of experience building and maintaining
            enterprise web applications in fintech. My work has focused on scalable UI,
            accessibility, and delivering polished experiences across client, advisor, and
            internal platforms.
          </p>

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            This portfolio highlights the kind of frontend work I enjoy most: thoughtful
            interfaces, strong UX fundamentals, resilient UI states, and reusable React
            component patterns.
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
            and production-minded React architecture.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
              I’m focused on frontend roles where accessibility, UI quality, and strong
              React fundamentals matter.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/dannymckinney88"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                </a>
              </Button>

              <Button variant="outline" asChild>
                <Link to="/github">Open Featured Demo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Home;
