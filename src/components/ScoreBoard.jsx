import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const ScoreBoard = () => {
  const { score, currentIndex, questions } = useContext(QuizContext);

  return (
    <div>
      <p>Score: {score}</p>
      <p>Question {currentIndex + 1} of {questions.length}</p>
    </div>
  );
};

export default ScoreBoard;