import { CheckCircle2 } from 'lucide-react';

import { SectionLabel } from '@/components/common/SectionLabel';

const strengths = [
  {
    number: '01',
    title: 'Accessibility',
    description:
      'WCAG 2.2 AA-minded frontend work across React and Angular UI, including keyboard flow, focus management, ARIA fixes, and screen reader behavior.',
  },
  {
    number: '02',
    title: 'Data-heavy UI',
    description:
      'Tables, filter systems, bulk actions, optimistic updates, and dense workflows built for real data volumes, not demo states.',
  },
  {
    number: '03',
    title: 'Design systems',
    description:
      'Token-based theming, reusable primitives, documented component behavior, and accessibility patterns that scale across product UI.',
  },
  {
    number: '04',
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
      <div className="flex flex-col gap-10">
        <SectionLabel>About</SectionLabel>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: headline + body copy + open-to-work callout */}
          <div className="flex flex-col gap-6">
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              I&apos;m a frontend engineer focused on complex product UI that has to{' '}
              <span className="text-primary">hold up in production.</span>
            </h2>

            <div className="space-y-4">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I build frontend systems that don&apos;t fall over in production:
                accessible by default, keyboard-complete, tested against real data
                volumes, and documented well enough that the next engineer doesn&apos;t
                need to ask me what it does.
              </p>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                I care about product context as much as code. The best component in the
                world is useless if it&apos;s solving the wrong problem.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card px-4 py-3">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Open to mid-level and senior frontend roles.
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Also taking short consulting engagements on accessibility and
                    data-heavy UI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: intro summary + 2×2 strength cards */}
          <div className="flex flex-col gap-6">
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Five years in enterprise fintech shaped how I build: accessible by default,
              resilient under real data, and clear enough for teams to maintain.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {strengths.map((strength) => (
                <div
                  key={strength.title}
                  className="rounded-xl border border-border bg-card p-4 sm:p-5"
                >
                  <p
                    className="mb-2 text-xs font-semibold text-section-label"
                    aria-hidden="true"
                  >
                    {strength.number}
                  </p>

                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">
                    {strength.title}
                  </h3>

                  <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
