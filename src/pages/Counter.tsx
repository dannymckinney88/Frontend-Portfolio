import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import CounterControls from "../components/counter/CounterControls";
import CounterDisplay from "../components/counter/CounterDisplay";

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
    <section className="w-full px-4 py-12">
      <div className="w-full space-y-8">
        <PageHeader
          title="Counter App"
          description="A simple React demo focused on state updates, component composition, and UI behavior."
        />

        <div className="flex justify-center">
          <Card className="w-full max-w-md rounded-2xl border-border/80 shadow-sm">
            <CardContent className="flex flex-col items-center gap-4 px-6 py-6 text-center">
              <CounterDisplay count={count} />

              <p className="text-sm text-muted-foreground">
                Range: {MIN_COUNT} - {MAX_COUNT}
              </p>
            </CardContent>

            <CardFooter className="flex justify-center border-t bg-muted/30 px-4 py-4">
              <CounterControls
                onIncrement={increment}
                onDecrement={decrement}
                onReset={reset}
                isMin={isMin}
                isMax={isMax}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Counter;
