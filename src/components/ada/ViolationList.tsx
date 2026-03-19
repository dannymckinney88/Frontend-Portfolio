import { Card, CardContent } from '@/components/ui/card';

import type { AuditViolation } from './types';
import ViolationCard from './ViolationCard';

interface ViolationListProps {
  violations: AuditViolation[];
}

const ViolationList = ({ violations }: ViolationListProps) => {
  if (!violations.length) return null;

  const impactOrder: Record<string, number> = {
    critical: 0,
    serious: 1,
    moderate: 2,
    minor: 3,
  };

  const sortedViolations = [...violations].sort((a, b) => {
    const aImpact = impactOrder[a.impact ?? 'minor'] ?? 99;
    const bImpact = impactOrder[b.impact ?? 'minor'] ?? 99;

    return aImpact - bImpact;
  });

  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby="violation-list-heading">
      <CardContent className="p-5 stack gap-4">
        <div className="space-y-1">
          <h2
            id="violation-list-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Violations
          </h2>

          <p className="text-sm text-muted-foreground">
            Review each accessibility issue and the affected nodes returned by the audit.
          </p>
        </div>

        <div className="stack gap-4">
          {sortedViolations.map((violation) => (
            <ViolationCard key={violation.id} violation={violation} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationList;
