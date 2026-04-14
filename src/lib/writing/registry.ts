import type { Post } from './types';

// Minimal YAML frontmatter parser — no Node.js dependencies.
// Handles simple key: value and key: "quoted value" lines only,
// which is all a blog post frontmatter needs.
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(raw);
  if (!fmMatch) return { data: {}, content: raw };

  const content = raw.slice(fmMatch[0].length);
  const data: Record<string, string> = {};

  for (const line of fmMatch[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (!key) continue;
    const rawVal = line.slice(colonIdx + 1).trim();
    // Strip surrounding quotes and unescape \" or \'
    const quoted = /^(["'])([\s\S]*)\1$/.exec(rawVal);
    data[key] = quoted ? quoted[2].replace(/\\(["'])/g, '$1') : rawVal;
  }

  return { data, content };
}

// Vite resolves this glob at build time — no Node.js fs needed.
// Each value is the raw file content as a string.
const rawFiles = import.meta.glob<string>('../../../content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const postRegistry: Record<string, Post> = Object.fromEntries(
  Object.entries(rawFiles).map(([filePath, raw]) => {
    const slug = filePath.split('/').pop()!.replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);

    return [
      slug,
      {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        date: data.date ?? '',
        coverImage: data.coverImage || undefined,
        content,
      },
    ];
  }),
);
