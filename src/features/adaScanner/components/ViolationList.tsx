import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { IMPACT_ORDER as impactOrder, IMPACT_STYLES } from '../constants';
import type { AuditImpact, AuditViolation } from '../types';
import ViolationCard from './ViolationCard';

/**
 * Violation filter options
 */
type ViolationFilter = 'all' | Exclude<AuditImpact, null>;

/**
 * Filter labels
 */
const FILTER_LABELS: Record<ViolationFilter, string> = {
  all: 'All',
  critical: 'Critical',
  serious: 'Serious',
  moderate: 'Moderate',
  minor: 'Minor',
};

interface ViolationListProps {
  violation: AuditViolation[];
}

const ViolationList = ({ violation }: ViolationListProps) => {
  const [activeFilter, setActiveFilter] = useState<ViolationFilter>('all');
  const [allExpanded, setAllExpanded] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const sortedViolations = useMemo(
    () =>
      [...violation].sort((a, b) => {
        const aImpact = impactOrder[a.impact ?? 'minor'] ?? 99;
        const bImpact = impactOrder[b.impact ?? 'minor'] ?? 99;

        return aImpact - bImpact;
      }),
    [violation],
  );

  const filterCounts = useMemo(() => {
    return sortedViolations.reduce(
      (acc, violation) => {
        const impact = violation.impact ?? 'minor';

        acc.all += 1;
        acc[impact] += 1;

        return acc;
      },
      {
        all: 0,
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
      } satisfies Record<ViolationFilter, number>,
    );
  }, [sortedViolations]);

  const filteredViolations = useMemo(() => {
    if (activeFilter === 'all') {
      return sortedViolations;
    }

    return sortedViolations.filter(
      (violation) => (violation.impact ?? 'minor') === activeFilter,
    );
  }, [activeFilter, sortedViolations]);

  const handleToggleAll = () => {
    const nextExpanded = !allExpanded;

    setAllExpanded(nextExpanded);

    /**
     * Update all visible violations to match the new expand state.
     */
    setOpenItems(Object.fromEntries(filteredViolations.map((v) => [v.id, nextExpanded])));
  };

  const handleOpenChange = (id: string, nextOpen: boolean) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: nextOpen,
    }));
  };

  if (!sortedViolations.length) return null;

  return (
    <Card className="border-border/70 shadow-sm" aria-labelledby="violation-list-heading">
      <CardContent className="overflow-hidden p-4 sm:p-5">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2
              id="violation-list-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Violations
            </h2>

            <p className="text-sm text-muted-foreground">
              Review issues by severity and expand items for affected nodes and guidance.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Filter by severity</p>

            <div
              className="flex flex-wrap gap-2"
              aria-label="Filter violations by severity"
            >
              {(Object.keys(FILTER_LABELS) as ViolationFilter[]).map((filter) => {
                const isActive = activeFilter === filter;
                const count = filterCounts[filter];
                const isDisabled = filter !== 'all' && count === 0;

                return (
                  <Button
                    key={filter}
                    type="button"
                    size="sm"
                    variant={isActive ? 'default' : 'outline'}
                    disabled={isDisabled}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={cn(
                      'h-8 rounded-full px-3 text-xs sm:h-9 sm:px-4 sm:text-sm',
                      !isActive && filter !== 'all' && !isDisabled
                        ? IMPACT_STYLES[filter].badge
                        : '',
                      isDisabled && 'opacity-50',
                    )}
                  >
                    {FILTER_LABELS[filter]} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground sm:text-sm">
              {filteredViolations.length} violations shown
            </p>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleToggleAll}
              aria-label={
                allExpanded ? 'Collapse all violations' : 'Expand all violations'
              }
              className="h-8 w-fit px-2 text-xs sm:h-9 sm:px-3 sm:text-sm"
            >
              {allExpanded ? (
                <>
                  <ChevronUp aria-hidden="true" />
                  Collapse all
                </>
              ) : (
                <>
                  <ChevronDown aria-hidden="true" />
                  Expand all
                </>
              )}
            </Button>
          </div>

          {filteredViolations.length ? (
            <div className="stack gap-4">
              {filteredViolations.map((violation) => (
                <ViolationCard
                  key={violation.id}
                  violation={violation}
                  open={openItems[violation.id] ?? false}
                  onOpenChange={(nextOpen) => handleOpenChange(violation.id, nextOpen)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">
                No violations match the selected severity.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationList;
