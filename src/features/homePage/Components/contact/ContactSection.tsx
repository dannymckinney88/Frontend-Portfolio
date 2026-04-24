import { ContactActions } from './ContactActions';
import { ContactChannelsCard } from './ContactChannelsCard';
import { ContactFooterMeta } from './ContactFooterMeta';

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-foreground text-background dark:bg-surface-subtle dark:text-foreground"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-0 sm:px-6 md:pt-20">
        <div className="mb-6 flex items-center gap-4">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-background/80 dark:text-section-label">
            Get in touch
          </p>
          <div className="h-px flex-1 bg-background/20 dark:bg-border" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div>
              <h2
                id="contact-heading"
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                Let&apos;s talk about your frontend.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-background/65 dark:text-muted-foreground sm:text-base">
                Open to mid-level and senior frontend roles building accessible,
                production-ready UI, along with short consulting engagements focused on
                accessibility and data-heavy workflows. Based in Arizona; remote-friendly
                across US timezones.
              </p>
            </div>

            <ContactActions />
          </div>

          <ContactChannelsCard />
        </div>
      </div>

      <ContactFooterMeta />
    </section>
  );
};
