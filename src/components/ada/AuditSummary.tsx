import { useEffect, useRef } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { IMPACT_STYLES } from './constants';
import type { AuditImpact, AuditResult } from './types';

interface AuditSummaryProps {
  results: AuditResult | null;
}

const AuditSummary = ({ results }: AuditSummaryProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (results && headingRef.current) {
      headingRef.current.focus();
    }
  }, [results]);
  if (!results) return null;

  const total = results.violations.length;

  /** Count violations by impact */
  const countByImpact = (impact: Exclude<AuditImpact, null>) =>
    results.violations.filter((v) => v.impact === impact).length;

  const summaryItems = [
    { label: 'Critical', value: countByImpact('critical'), impact: 'critical' as const },
    { label: 'Serious', value: countByImpact('serious'), impact: 'serious' as const },
    { label: 'Moderate', value: countByImpact('moderate'), impact: 'moderate' as const },
    { label: 'Minor', value: countByImpact('minor'), impact: 'minor' as const },
  ];

  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby="audit-summary-heading">
      <CardContent className="p-5 stack gap-4">
        <div className="space-y-1">
          <h2
            id="audit-summary-heading"
            className="text-xl font-semibold tracking-tight"
            ref={headingRef}
            tabIndex={-1}
          >
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

          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={`rounded-xl border p-3 ${IMPACT_STYLES[item.impact].card}`}
            >
              <dt className="text-xs text-muted-foreground">{item.label}</dt>
              <dd className={`text-lg font-semibold ${IMPACT_STYLES[item.impact].label}`}>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default AuditSummary;
