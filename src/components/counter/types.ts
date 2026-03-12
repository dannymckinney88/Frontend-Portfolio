export type CounterDisplayProps = {
  count: number;
};

export type CounterControlsProps = {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  isMin: boolean;
  isMax: boolean;
};
