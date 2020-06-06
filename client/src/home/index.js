// Modules
import React, { memo, useCallback, useState } from 'react';

const HomeComponent = () => {
  const [count, setCount] = useState(0);

  const getIncrement = useCallback(
    () => setCount(count + 1),
    [count],
  );

  const getDecrement = useCallback(
    () => setCount(count - 1),
    [count],
  );

  return (
    <div>
      <h4>{count}</h4>
      <div>
        <button
          type="button"
          onClick={getIncrement}
        >
          increment
        </button>
        <button
          type="button"
          onClick={getDecrement}
        >
          decrement
        </button>
      </div>
    </div>
  );
};

export const Home = memo(HomeComponent);
