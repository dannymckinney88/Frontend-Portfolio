interface SectionLabelProps {
  children: React.ReactNode;
  id?: string;
}

export const SectionLabel = ({ children, id }: SectionLabelProps) => {
  return (
    <div className="flex items-center gap-4">
      <p
        id={id}
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-section-label"
      >
        {children}
      </p>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};
