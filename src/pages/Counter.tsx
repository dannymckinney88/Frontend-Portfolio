import CounterDisplay from "../components/counter/CounterDisplay";
import CounterControls from "../components/counter/CounterControls";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const MIN_COUNT = 0;
  const MAX_COUNT = 10;

  const increment = () => setCount((c) => Math.min(c + 1, MAX_COUNT));
  const decrement = () => setCount((c) => Math.max(c - 1, MIN_COUNT));
  const reset = () => setCount(0);

  const isMin = count === MIN_COUNT;
  const isMax = count === MAX_COUNT;
  return (
    <div>
      <CounterDisplay count={count} />
      <CounterControls
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
        isMin={isMin}
        isMax={isMax}
      />
    </div>
  );
};

export default Counter;
