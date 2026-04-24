import { FlagshipCard } from './FlagshipCard';
import type { ProjectCardProps } from './ProjectCard';

interface FlagshipProjectSectionProps {
  accessOpsProject: ProjectCardProps;
}

const accessOpsHighlights = [
  {
    n: '01',
    title: 'Prioritizes what to fix next',
    body: 'Turns audit findings into a focused backlog of unfixed issues, critical risk, and high-impact remediation work.',
  },
  {
    n: '02',
    title: 'Makes large issue sets workable',
    body: 'Filters, grouping, bulk assignment, and keyboard-operable row actions keep hundreds of issues manageable.',
  },
  {
    n: '03',
    title: 'Reduces duplicate work',
    body: 'Surfaces repeated failures across pages so teams can fix shared patterns instead of treating every issue as isolated.',
  },
  {
    n: '04',
    title: 'Tracks remediation status',
    body: 'Separates Open, In Progress, Fixed, Verified, and Accepted Risk so teams know what is active, done, or awaiting validation.',
  },
];

const accessOpsMetrics = [
  { value: '900+', label: 'Issues modeled' },
  { value: '5', label: 'Workflow states' },
  { value: 'AA', label: 'WCAG target' },
  { value: '100%', label: 'Core flows' },
];

const accessOpsCardContent = {
  eyebrow: 'ACCESSIBILITY REMEDIATION PLATFORM · 2026',
  ctaPrimary: 'View live system',
  imageSrc: '/featured-project.png',
  imageAlt:
    'AccessOps dashboard showing accessibility issue risk levels, remediation status, and scan cycle summary',
};

export const FlagshipProjectSection = ({
  accessOpsProject,
}: FlagshipProjectSectionProps) => {
  return (
    <section
      id="featured-project"
      tabIndex={-1}
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-18"
      aria-labelledby="featured-project-heading"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <p
            id="featured-project-heading"
            className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-section-label"
          >
            Featured Work
          </p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <FlagshipCard
          {...accessOpsCardContent}
          title={accessOpsProject.title}
          description={accessOpsProject.description}
          projectHref={accessOpsProject.projectHref}
          codeHref={accessOpsProject.codeHref}
          highlights={accessOpsHighlights}
          metrics={accessOpsMetrics}
          stack={accessOpsProject.stack}
        />
      </div>
    </section>
  );
};
