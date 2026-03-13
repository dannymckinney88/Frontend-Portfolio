import { useState } from "react";
import CounterDisplay from "../components/counter/CounterDisplay";
import CounterControls from "../components/counter/CounterControls";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

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
    <section className="flex flex-col items-center">
      <Card className="w-full max-w-md rounded-2xl border-border/80 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Counter App</CardTitle>
          <CardDescription>
            Practice state, props, and event handling.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <CounterDisplay count={count} />

          <p className="text-sm text-muted-foreground">
            Min: {MIN_COUNT} · Max: {MAX_COUNT}
          </p>
        </CardContent>

        <CardFooter className="flex justify-center pt-6">
          <CounterControls
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
            isMin={isMin}
            isMax={isMax}
          />
        </CardFooter>
      </Card>
    </section>
  );
};

export default Counter;
