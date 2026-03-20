import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { IMPACT_STYLES } from './constants';
import type { AuditViolation } from './types';

interface ViolationCardProps {
  violation: AuditViolation;
  defaultExpanded?: boolean;
}

const ViolationCard = ({ violation, defaultExpanded = false }: ViolationCardProps) => {
  const [open, setOpen] = useState(defaultExpanded);

  const headingId = `violation-${violation.id}`;
  const contentId = `violation-content-${violation.id}`;

  const impact = violation.impact ?? 'minor';
  const impactBadgeClass = IMPACT_STYLES[impact].badge;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-border/70 shadow-sm" aria-labelledby={headingId}>
        <CardContent className="p-0">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 rounded-2xl p-4 text-left transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
              aria-expanded={open}
              aria-controls={contentId}
            >
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 id={headingId} className="text-lg font-semibold tracking-tight">
                    {violation.id}
                  </h3>

                  <span
                    className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${impactBadgeClass}`}
                  >
                    {impact}
                  </span>
                </div>

                <p className="text-sm font-medium text-foreground">{violation.help}</p>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {violation.description}
                </p>
              </div>

              <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                <span className="hidden sm:inline">{open ? 'Collapse' : 'Expand'}</span>
                <ChevronDown
                  className={`transition-transform ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </span>
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent id={contentId}>
            <div className="border-t border-border/60 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Affected Nodes
                  </h4>

                  <ul className="stack gap-3">
                    {violation.nodes.map((node, index) => (
                      <li
                        key={`${violation.id}-${index}`}
                        className="rounded-xl border border-border/70 bg-muted/30 p-3"
                      >
                        <p className="text-sm font-medium text-foreground">
                          Target: {node.target.join(', ')}
                        </p>

                        {node.failureSummary ? (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {node.failureSummary}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={violation.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  <span>View guidance for {violation.id}</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};

export default ViolationCard;
