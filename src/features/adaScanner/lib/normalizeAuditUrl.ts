export type NormalizeAuditUrlResult =
  | {
      ok: true;
      url: string;
    }
  | {
      ok: false;
      message: string;
      errorType: 'invalid_url' | 'invalid_protocol';
    };

export const normalizeAuditUrl = (value: string): NormalizeAuditUrlResult => {
  let normalizedUrl = value.trim();

  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  try {
    const parsedUrl = new URL(normalizedUrl);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return {
        ok: false,
        message: 'Please enter a valid http or https URL.',
        errorType: 'invalid_protocol',
      };
    }

    return {
      ok: true,
      url: parsedUrl.toString(),
    };
  } catch {
    return {
      ok: false,
      message: 'Please enter a valid URL.',
      errorType: 'invalid_url',
    };
  }
};
