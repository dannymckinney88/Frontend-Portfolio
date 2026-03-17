import PageHeader from '@/components/common/PageHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectData } from '@/components/projects/projectData';

/**
 * Display the projects page
 */
function Home() {
  return (
    <section className="page-stack">
      <PageHeader
        title="Projects"
        description="Small React projects focused on state management, component architecture, and accessible UI patterns."
      />

      <div className="section-stack">
        <p className="mx-auto max-w-3xl text-sm text-center text-muted-foreground/80">
          New projects are added regularly as I explore deeper React patterns, TypeScript,
          API integration, and accessible UI architecture.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projectData.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
