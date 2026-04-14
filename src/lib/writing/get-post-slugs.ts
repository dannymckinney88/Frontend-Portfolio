import { postRegistry } from './registry';

export const getPostSlugs = (): string[] => Object.keys(postRegistry);
