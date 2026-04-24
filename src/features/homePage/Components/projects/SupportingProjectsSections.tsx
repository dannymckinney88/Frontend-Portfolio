import { SectionLabel } from '@/components/common/SectionLabel';

import ProjectCard, { type ProjectCardProps } from './ProjectCard';

interface SupportingProjectsSectionProps {
  supportingProjects: ProjectCardProps[];
}

export const SupportingProjectsSection = ({
  supportingProjects,
}: SupportingProjectsSectionProps) => {
  return (
    <section
      id="supporting-projects"
      tabIndex={-1}
      className="scroll-mt-20 bg-surface-subtle pt-20 pb-14 md:pt-24 md:pb-18"
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
            {supportingProjects.map((project, index) => (
              <div key={project.title} className="min-w-0">
                <ProjectCard {...project} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
