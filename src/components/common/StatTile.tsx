interface StatTileProps {
  label: string;
  value: number;
}

/**
 * Display a compact stat tile
 */
const StatTile = ({ label, value }: StatTileProps) => {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
};

export default StatTile;
