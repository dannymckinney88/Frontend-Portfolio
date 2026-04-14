import type { ReactNode } from 'react';

type Props = {
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  children: ReactNode;
};

export const ArticleLayout = ({
  title,
  description,
  date,
  coverImage,
  children,
}: Props) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {coverImage && <img src={coverImage} alt="" className="mb-8 w-full rounded-2xl" />}

      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mb-4">{description}</p>
      <p className="text-muted-foreground mb-8 text-sm">{date}</p>

      {children}
    </article>
  );
};
