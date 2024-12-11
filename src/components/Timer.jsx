import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(seconds + 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return <div>Time elapsed: {seconds} seconds</div>;
};

export default Timer;