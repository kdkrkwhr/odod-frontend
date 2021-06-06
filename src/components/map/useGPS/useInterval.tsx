import { useState } from 'react';

const useInterval = (defaultInterval?: number) => {
  const [interval, setInterval] = useState<number>(defaultInterval || 3000);
  
  const increase = () => {
    setInterval(interval + 500);
  }
  
  const decrease = () => {
    setInterval(Math.max(interval - 500, 500));
  }

  return ({
    get interval() { return interval },
    increase,
    decrease,
  });
}

export default useInterval;