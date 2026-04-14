type Props = {
  content: string;
};

export const ArticleProse = ({ content }: Props) => {
  return (
    <div
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
