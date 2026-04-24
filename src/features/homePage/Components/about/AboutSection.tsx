import { SectionLabel } from '@/components/common/SectionLabel';

const strengths = [
  {
    title: 'Accessibility',
    description:
      'WCAG 2.2 AA-minded frontend work across React and Angular UI, including keyboard flow, focus management, ARIA fixes, and screen reader behavior.',
  },
  {
    title: 'Data-heavy UI',
    description:
      'Tables, filter systems, bulk actions, optimistic updates, and dense workflows built for real data volumes, not demo states.',
  },
  {
    title: 'Design systems',
    description:
      'Token-based theming, reusable primitives, documented component behavior, and accessibility patterns that scale across product UI.',
  },
  {
    title: 'Product judgment',
    description:
      'Fintech-shaped. I read the spec, then I read the workflow. I push back when the design will break in production.',
  },
] as const;

export const AboutSection = () => {
  return (
    <section
      className="mx-auto w-full max-w-6xl bg-background px-4 pt-20 pb-14 sm:px-6 md:pt-24 md:pb-18"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col gap-8">
        <SectionLabel>About</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[45%_55%] lg:gap-16">
          <div className="space-y-4">
            <h2
              id="about-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              I&apos;m a frontend engineer focused on the boring, load-bearing parts of
              product UI.
            </h2>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Five years shipping frontend UI in enterprise fintech — the kind of software
              where a broken form or an inaccessible table is a compliance incident, not
              just a bug. That shaped how I work.
            </p>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              I build frontend systems that don&apos;t fall over in production: accessible
              by default, keyboard-complete, tested against real data volumes, and
              documented well enough that the next engineer doesn&apos;t need to ask me
              what it does.
            </p>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              I care about product context as much as code. The best component in the
              world is useless if it&apos;s solving the wrong problem.
            </p>
          </div>

          <div className="divide-y divide-border">
            {strengths.map((strength) => (
              <div key={strength.title} className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-foreground">{strength.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
