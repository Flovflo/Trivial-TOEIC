import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

const QuizProvider = ({ children, questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const hasMoreQuestions = currentIndex < questions.length;

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentIndex,
        setCurrentIndex,
        score,
        setScore,
        hasMoreQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;