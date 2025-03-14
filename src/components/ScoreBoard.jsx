import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const ScoreBoard = () => {
  const { score, currentIndex, questions } = useContext(QuizContext);
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="scoreboard">
      <p>Score : {score}</p>
      <p>Question {currentIndex + 1} sur {questions.length}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ScoreBoard;