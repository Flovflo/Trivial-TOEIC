import React from 'react';
import useQuizLogic from '../hooks/useQuizLogic';

const QuestionDisplay = () => {
  const {
    currentQuestion,
    submitAnswer,
    nextQuestion,
    feedback,
    hasMoreQuestions,
    selectedAnswer,
  } = useQuizLogic();

  if (!hasMoreQuestions) {
    return (
      <div className="completion-message">
        🎉 Great job! Quiz complete.
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="question-container">
      <h2>{currentQuestion.question}</h2>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              feedback && option === currentQuestion.correctAnswer
                ? 'correct'
                : feedback && option === selectedAnswer
                ? 'selected'
                : ''
            }`}
            onClick={() => submitAnswer(option)}
            disabled={!!feedback} // Désactiver les boutons après une réponse
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div className="feedback-container">
          <p
            className={`feedback-message ${
              feedback.isCorrect ? 'correct' : 'incorrect'
            }`}
          >
            {feedback.isCorrect ? 'Correct!' : 'Incorrect.'}
          </p>
          <p className="feedback-explanation">{feedback.explanation}</p>
          <button className="next-button" onClick={nextQuestion}>
            Prochaine Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;