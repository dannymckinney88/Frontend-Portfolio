import type { AuditResult } from '@/components/ada/types';

const API_BASE_URL = import.meta.env.VITE_AUDIT_API_URL ?? 'http://localhost:3001';

export async function scanPage(url: string): Promise<AuditResult> {
  const response = await fetch(`${API_BASE_URL}/audit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Audit failed.');
  }

  return data;
}
