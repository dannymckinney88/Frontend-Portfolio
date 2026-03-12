import type { CounterControlsProps } from "./types";

const CounterControls = ({
  onIncrement,
  onDecrement,
  onReset,
  isMin,
  isMax,
}: CounterControlsProps) => {
  return (
    <div>
      <button onClick={onIncrement} disabled={isMax}>
        Increment
      </button>
      <button onClick={onDecrement} disabled={isMin}>
        Decrement
      </button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default CounterControls;
