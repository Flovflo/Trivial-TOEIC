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
      {/* Affichage des métadonnées (thème et difficulté) */}
      {currentQuestion.theme && currentQuestion.difficulty && (
        <p className="question-meta">
          <strong>Thème :</strong> {currentQuestion.theme} | <strong>Difficulté :</strong> {currentQuestion.difficulty}
        </p>
      )}
      <h2>{currentQuestion.question}</h2>
      
      {/* Affichage des options sous forme de box intégrant l’explication */}
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="option-box">
            <button
              className={`option-button ${
                feedback && option === currentQuestion.correctAnswer
                  ? 'correct'
                  : feedback && option === selectedAnswer
                  ? 'selected'
                  : ''
              }`}
              onClick={() => submitAnswer(option)}
              disabled={!!feedback}
            >
              {option}
            </button>
            {/* L’explication intégrée dans la même box s’affiche avec animation */}
            {feedback && (
              <div className="option-explanation">
                {currentQuestion.detailed_explanations[option]}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Bouton de passage à la prochaine question (feedback global) */}
      {feedback && (
        <div className="feedback-footer">
          <button className="next-button" onClick={nextQuestion}>
            Prochaine Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;