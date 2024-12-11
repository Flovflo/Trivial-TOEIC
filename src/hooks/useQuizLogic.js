import { useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';

const useQuizLogic = () => {
  const {
    questions,
    currentIndex,
    setCurrentIndex,
    score,
    setScore,
    hasMoreQuestions,
  } = useContext(QuizContext);

  const [feedback, setFeedback] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Ajoutez un état pour suivre la réponse sélectionnée

  const currentQuestion = questions[currentIndex];

  const submitAnswer = (answer) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;

    // Met à jour le feedback et la réponse sélectionnée
    setFeedback({
      isCorrect,
      explanation: currentQuestion.explanation,
    });
    setSelectedAnswer(answer);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setFeedback(null); // Réinitialise le feedback
    setSelectedAnswer(null); // Réinitialise la réponse sélectionnée
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1); // Passe à la question suivante
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
  };

  return {
    currentQuestion,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    hasMoreQuestions,
    feedback,
    selectedAnswer, // Ajoutez cet état au retour
  };
};

export default useQuizLogic;