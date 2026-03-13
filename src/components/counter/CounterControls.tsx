import type { CounterControlsProps } from "./types";
import { Button } from "@/components/ui/button";

export default function CounterControls({
  onIncrement,
  onDecrement,
  onReset,
  isMin,
  isMax,
}: CounterControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button onClick={onIncrement} disabled={isMax}>
        Increment
      </Button>

      <Button onClick={onDecrement} disabled={isMin} variant="outline">
        Decrement
      </Button>

      <Button onClick={onReset} variant="outline">
        Reset
      </Button>
    </div>
  );
}
