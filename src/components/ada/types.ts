export type AuditImpact = 'critical' | 'serious' | 'moderate' | 'minor' | null;

export interface AuditNode {
  target: string[];
  html: string;
  failureSummary?: string;
}

export interface AuditViolation {
  id: string;
  impact: AuditImpact;
  description: string;
  help: string;
  helpUrl: string;
  nodes: AuditNode[];
}

export interface AuditResult {
  url: string;
  scannedAt: string;
  violations: AuditViolation[];
  passes: number; // ← missing
  incomplete: number; // ← missing
  inapplicable: number; // ← missing
}
