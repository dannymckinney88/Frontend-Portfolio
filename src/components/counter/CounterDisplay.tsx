import type { CounterDisplayProps } from "./types";

const CounterDisplay = ({ count }: CounterDisplayProps) => {
  return (
    <div>
      <p>Count is</p>
      <h2 className="text-3xl font-bold underline">{count}</h2>
    </div>
  );
};

export default CounterDisplay;
