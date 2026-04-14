import { ArticleListItem } from '@/components/writing/article-list-item';
import { getAllPosts } from '@/lib/writing/get-all-posts';

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Writing</h1>
      <p className="text-muted-foreground mb-8">
        Engineering notes, case studies, and lessons learned building real products.
      </p>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <ArticleListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
