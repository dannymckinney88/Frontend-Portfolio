import { postRegistry } from './registry';
import type { PostMeta } from './types';

export const getAllPosts = (): PostMeta[] =>
  Object.values(postRegistry)
    .map(({ content: _content, ...meta }): PostMeta => meta)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
