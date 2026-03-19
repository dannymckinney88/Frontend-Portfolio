import type { AuditResult } from '@/components/ada/types';

const MOCK_AUDIT_RESULT: AuditResult = {
  url: 'https://example.com',
  scannedAt: new Date().toISOString(),
  violations: [
    {
      id: 'color-contrast',
      impact: 'serious',
      description:
        'Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds.',
      help: 'Elements must meet minimum color contrast ratio thresholds.',
      helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/color-contrast',
      nodes: [
        {
          target: ['.hero-subtitle'],
          html: '<p class="hero-subtitle">Low contrast text example</p>',
          failureSummary:
            'Fix any of the following: Element has insufficient color contrast of 2.9:1.',
        },
      ],
    },
    {
      id: 'button-name',
      impact: 'critical',
      description:
        'Ensures buttons have discernible text so screen reader users understand the control purpose.',
      help: 'Buttons must have discernible text.',
      helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/button-name',
      nodes: [
        {
          target: ['button.icon-only'],
          html: '<button class="icon-only"></button>',
          failureSummary:
            'Fix any of the following: Element does not have inner text that is visible to screen readers.',
        },
      ],
    },
    {
      id: 'image-alt',
      impact: 'moderate',
      description:
        'Ensures image elements have alternate text or a valid alternative presentation.',
      help: 'Images must have alternate text.',
      helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/image-alt',
      nodes: [
        {
          target: ['img.feature-image'],
          html: '<img class="feature-image" src="/feature.png" />',
          failureSummary:
            'Fix any of the following: Image does not have an alt attribute.',
        },
      ],
    },
  ],
};

export const scanPage = async (url: string): Promise<AuditResult> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    ...MOCK_AUDIT_RESULT,
    url,
    scannedAt: new Date().toISOString(),
  };
};
