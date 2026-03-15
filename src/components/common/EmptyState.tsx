type EmptyStateProps = {
  message: string;
  className?: string;
};

const EmptyState = ({ message, className = "" }: EmptyStateProps) => {
  return (
    <div
      className={`rounded-md border border-dashed px-4 py-8 text-center ${className}`}
    >
      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
