import React from 'react';
import useQuizLogic from '../hooks/useQuizLogic';

const RestartButton = () => {
  const { restartQuiz } = useQuizLogic();

  return <button onClick={restartQuiz}>Restart</button>;
};

export default RestartButton;