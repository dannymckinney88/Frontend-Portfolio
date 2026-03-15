type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

const PageHeader = ({
  title,
  description,
  className = "",
}: PageHeaderProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageHeader;
