import { Card, CardContent } from '@/components/ui/card';

import type { AuditImpact, AuditResult } from './types';

interface AuditSummaryProps {
  results: AuditResult | null;
}

const AuditSummary = ({ results }: AuditSummaryProps) => {
  if (!results) return null;

  /** Count violations by impact */
  const countByImpact = (impact: Exclude<AuditImpact, null>) =>
    results.violations.filter((v) => v.impact === impact).length;

  const total = results.violations.length;

  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby="audit-summary-heading">
      <CardContent className="p-5 stack gap-4">
        <div className="space-y-1">
          <h2 id="audit-summary-heading" className="text-xl font-semibold tracking-tight">
            Audit Summary
          </h2>
          <p className="text-sm text-muted-foreground">
            Overview of detected accessibility issues for this page.
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <dt className="text-xs text-muted-foreground">Total Issues</dt>
            <dd className="text-lg font-semibold text-foreground">{total}</dd>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <dt className="text-xs text-muted-foreground">Critical</dt>
            <dd className="text-lg font-semibold text-foreground">
              {countByImpact('critical')}
            </dd>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <dt className="text-xs text-muted-foreground">Serious</dt>
            <dd className="text-lg font-semibold text-foreground">
              {countByImpact('serious')}
            </dd>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <dt className="text-xs text-muted-foreground">Moderate</dt>
            <dd className="text-lg font-semibold text-foreground">
              {countByImpact('moderate')}
            </dd>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <dt className="text-xs text-muted-foreground">Minor</dt>
            <dd className="text-lg font-semibold text-foreground">
              {countByImpact('minor')}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default AuditSummary;
