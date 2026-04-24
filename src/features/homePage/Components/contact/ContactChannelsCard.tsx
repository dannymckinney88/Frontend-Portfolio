import { trackEvent } from '@/lib/analytics';

import { contactChannels } from './contactData';

const isExternalChannel = (href: string) => !href.startsWith('mailto:');

export const ContactChannelsCard = () => {
  return (
    <div className="lg:pt-14">
      <div className="overflow-hidden rounded-lg border border-background/15 dark:border-border">
        <div className="border-b border-background/15 px-5 py-3 dark:border-border">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/55 dark:text-muted-foreground">
            Channels
          </p>
        </div>

        <ul className="divide-y divide-background/10 dark:divide-border">
          {contactChannels.map((channel) => {
            const isExternal = isExternalChannel(channel.href);

            return (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between gap-4 px-5 py-4 text-sm transition-colors hover:bg-background/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-background/40 dark:hover:bg-muted/50 dark:focus-visible:ring-ring"
                  onClick={() =>
                    trackEvent('click_contact_cta', {
                      target: channel.label,
                      location: 'footer_channels',
                    })
                  }
                >
                  <span className="font-medium">{channel.label}</span>

                  <span className="font-mono text-xs text-background/45 dark:text-muted-foreground">
                    {channel.display}
                    {isExternal ? (
                      <>
                        <span aria-hidden="true" className="ml-1.5">
                          ↗
                        </span>
                        <span className="sr-only"> opens in a new tab</span>
                      </>
                    ) : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
