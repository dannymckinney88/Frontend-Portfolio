import FeaturedProjectCard from './FeaturedProjectCard';
import type { ProjectCardProps } from './ProjectCard';

interface FeaturedProjectSectionProps {
  heelFlowProject: ProjectCardProps;
}

const heelFlowCardContent = {
  eyebrow: 'Client workflow platform',
  ctaLabel: 'Try live demo',
  imageSrc: '/heelflow-recap.png',
  imageAlt:
    'HeelFlow client recap page showing a dog photo, session summary, homework steps, and training progress',
  imageVariant: 'plain' as const,
  showDemoAccess: true,
  demoCredentials: {
    email: 'demo@heelflow.app',
    password: 'HeelflowDemo1!',
  },
};

export const FeaturedProjectSection = ({
  heelFlowProject,
}: FeaturedProjectSectionProps) => {
  const heelFlowHighlights = heelFlowProject.features.slice(0, 3);

  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-18"
      aria-labelledby="featured-secondary-heading"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <p
            id="featured-secondary-heading"
            className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-section-label"
          >
            Featured Product Build
          </p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <FeaturedProjectCard
          {...heelFlowCardContent}
          title={heelFlowProject.title}
          description={heelFlowProject.description}
          scope={heelFlowProject.scope}
          highlights={heelFlowHighlights}
          stack={heelFlowProject.stack}
          projectHref={heelFlowProject.projectHref}
          codeHref={heelFlowProject.codeHref}
        />
      </div>
    </section>
  );
};
