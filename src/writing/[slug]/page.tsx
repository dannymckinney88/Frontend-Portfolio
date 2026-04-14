import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ArticleLayout } from '@/components/writing/article-layout';
import { ArticleProse } from '@/components/writing/article-prose';
import { getPostBySlug } from '@/lib/writing/get-post-by-slug';
import { markdownToHtml } from '@/lib/writing/markdown-to-html';

const WritingPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  const [contentHtml, setContentHtml] = useState('');

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!post) return;
      const html = await markdownToHtml(post.content);
      if (isMounted) setContentHtml(html);
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/writing" replace />;
  }

  return (
    <main>
      <ArticleLayout
        title={post.title}
        description={post.description}
        date={post.date}
        coverImage={post.coverImage}
      >
        <ArticleProse content={contentHtml} />
      </ArticleLayout>
    </main>
  );
};

export default WritingPostPage;
