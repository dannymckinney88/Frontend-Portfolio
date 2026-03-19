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

  const countsByImpact = results.violations.reduce<
    Partial<Record<Exclude<AuditImpact, null>, number>>
  >((acc, violation) => {
    if (!violation.impact) return acc;

    acc[violation.impact] = (acc[violation.impact] ?? 0) + 1;
    return acc;
  }, {});

  const summaryItems = [
    {
      label: 'Critical',
      value: countsByImpact.critical ?? 0,
      impact: 'critical' as const,
    },
    {
      label: 'Serious',
      value: countsByImpact.serious ?? 0,
      impact: 'serious' as const,
    },
    {
      label: 'Moderate',
      value: countsByImpact.moderate ?? 0,
      impact: 'moderate' as const,
    },
    {
      label: 'Minor',
      value: countsByImpact.minor ?? 0,
      impact: 'minor' as const,
    },
  ];

  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby="audit-summary-heading">
      <CardContent className="p-5 stack gap-4">
        <div className="space-y-1">
          <h2
            id="audit-summary-heading"
            className="text-xl font-semibold tracking-tight focus:outline-none"
            ref={headingRef}
            tabIndex={-1}
          >
            Audit Summary
          </h2>

          <p className="text-sm text-muted-foreground">
            Overview of detected accessibility issues for this page.
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <dt className="text-xs text-muted-foreground">Total Issues</dt>
            <dd className="text-lg font-semibold text-foreground">{total}</dd>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-900/40 dark:bg-green-950/30">
            <dt className="text-xs text-muted-foreground">Passed</dt>
            <dd className="text-lg font-semibold text-green-700 dark:text-green-400">
              {results.passes}
            </dd>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 dark:border-sky-900/40 dark:bg-sky-950/30">
            <dt className="text-xs text-muted-foreground">Incomplete</dt>
            <dd className="text-lg font-semibold text-sky-700 dark:text-sky-400">
              {results.incomplete}
            </dd>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/30">
            <dt className="text-xs text-muted-foreground">Inapplicable</dt>
            <dd className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              {results.inapplicable}
            </dd>
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
