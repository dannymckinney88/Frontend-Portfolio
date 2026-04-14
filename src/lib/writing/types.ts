export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
};

export type Post = PostMeta & {
  content: string;
};
