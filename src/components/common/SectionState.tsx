interface SectionStateProps {
  message: string;
  tone?: 'default' | 'error';
  live?: 'polite' | 'assertive';
  role?: 'status' | 'alert';
}

const SectionState = ({
  message,
  tone = 'default',
  live = 'polite',
  role = 'status',
}: SectionStateProps) => {
  return (
    <p
      className={
        tone === 'error' ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'
      }
      role={role}
      aria-live={live}
    >
      {message}
    </p>
  );
};

export default SectionState;
