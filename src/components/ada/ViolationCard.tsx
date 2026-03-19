import { ExternalLink } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { IMPACT_STYLES } from './constants';
import type { AuditViolation } from './types';

interface ViolationCardProps {
  violation: AuditViolation;
}

const ViolationCard = ({ violation }: ViolationCardProps) => {
  const headingId = `violation-${violation.id}`;

  const impact = violation.impact ?? 'minor';
  const impactBadgeClass = IMPACT_STYLES[impact].badge;
  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby={headingId}>
      <CardContent className="p-5 stack gap-4">
        <div className="stack gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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

          <p className="text-sm text-muted-foreground">{violation.description}</p>
        </div>

        <div className="stack gap-2">
          <h4 className="text-sm font-semibold text-foreground">Affected Nodes</h4>

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
      </CardContent>
    </Card>
  );
};

export default ViolationCard;
