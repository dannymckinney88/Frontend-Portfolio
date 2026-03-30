import { useEffect, useRef } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { IMPACT_STYLES } from '../constants';
import type { AuditImpact, AuditResult } from '../types';

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

  const issueSummaryItems = [
    {
      label: 'Total Issues',
      value: total,
      className: 'border-border/70 bg-muted/30',
      valueClassName: 'text-foreground',
    },
    {
      label: 'Critical',
      value: countsByImpact.critical ?? 0,
      className: IMPACT_STYLES.critical.card,
      valueClassName: IMPACT_STYLES.critical.label,
    },
    {
      label: 'Serious',
      value: countsByImpact.serious ?? 0,
      className: IMPACT_STYLES.serious.card,
      valueClassName: IMPACT_STYLES.serious.label,
    },
    {
      label: 'Moderate',
      value: countsByImpact.moderate ?? 0,
      className: IMPACT_STYLES.moderate.card,
      valueClassName: IMPACT_STYLES.moderate.label,
    },
    {
      label: 'Minor',
      value: countsByImpact.minor ?? 0,
      className: IMPACT_STYLES.minor.card,
      valueClassName: IMPACT_STYLES.minor.label,
    },
  ];

  const auditCheckItems = [
    {
      label: 'Passed',
      value: results.passes,
      className:
        'border-green-200/70 bg-green-50/70 dark:border-green-900/40 dark:bg-green-950/20',
      valueClassName: 'text-green-700 dark:text-green-400',
    },
    {
      label: 'Needs Review',
      value: results.incomplete,
      className:
        'border-sky-200/70 bg-sky-50/70 dark:border-sky-900/40 dark:bg-sky-950/20',
      valueClassName: 'text-sky-700 dark:text-sky-400',
    },
    {
      label: 'Not Applicable',
      value: results.inapplicable,
      className:
        'border-slate-200/70 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/20',
      valueClassName: 'text-slate-700 dark:text-slate-300',
    },
  ];

  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby="audit-summary-heading">
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-5">
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
              Overview of detected accessibility issues and audit check results.
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">Issue Summary</h3>
              <p className="text-sm text-muted-foreground">
                Severity counts for issues found on the scanned page.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              {issueSummaryItems.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl border p-3 ${item.className}`}
                >
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd
                    className={`text-base font-semibold sm:text-lg ${item.valueClassName}`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">Audit Checks</h3>
              <p className="text-sm text-muted-foreground">
                Additional axe results, including checks that need manual review or did
                not apply to this page.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {auditCheckItems.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl border p-3 ${item.className}`}
                >
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd
                    className={`text-base font-semibold sm:text-lg ${item.valueClassName}`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditSummary;
