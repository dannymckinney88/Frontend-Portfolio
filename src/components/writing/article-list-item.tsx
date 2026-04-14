import { Link } from 'react-router-dom';

import type { PostMeta } from '@/lib/writing/types';

type Props = {
  post: PostMeta;
};

export const ArticleListItem = ({ post }: Props) => {
  return (
    <Link to={`/writing/${post.slug}`}>
      <div className="border-border hover:bg-muted/40 cursor-pointer rounded-xl border p-4 transition">
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="text-muted-foreground text-sm">{post.description}</p>
        <p className="text-muted-foreground mt-2 text-xs">{post.date}</p>
      </div>
    </Link>
  );
};
