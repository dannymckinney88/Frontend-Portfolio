import type { AuditResult } from '../types';

const LAST_SCAN_STORAGE_KEY = 'ada:last-scan';

export const readStoredScan = (): AuditResult | null => {
  try {
    const stored = localStorage.getItem(LAST_SCAN_STORAGE_KEY);

    if (!stored) return null;

    return JSON.parse(stored) as AuditResult;
  } catch {
    return null;
  }
};

export const writeStoredScan = (scan: AuditResult) => {
  localStorage.setItem(LAST_SCAN_STORAGE_KEY, JSON.stringify(scan));
};
