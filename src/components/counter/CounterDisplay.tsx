import type { CounterDisplayProps } from "./types";

const CounterDisplay = ({ count }: CounterDisplayProps) => {
  return (
    <div className="space-y-2 text-center">
      <p className="text-sm font-medium text-muted-foreground">Current Count</p>
      <h2 className="text-5xl font-bold tracking-tight">{count}</h2>
    </div>
  );
};

export default CounterDisplay;
