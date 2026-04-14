import { postRegistry } from './registry';
import type { Post } from './types';

export const getPostBySlug = (slug: string): Post | undefined => postRegistry[slug];
