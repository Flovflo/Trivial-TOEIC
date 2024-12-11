import React, { useEffect, useState } from 'react';
import QuizProvider from './context/QuizContext';
import QuestionDisplay from './components/QuestionDisplay';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/questions.json') // Charge le fichier JSON depuis le dossier public
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load questions');
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading questions:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !questions || questions.length === 0) {
    return <div>No questions available. Please try again later.</div>;
  }

  return (
    <QuizProvider questions={questions}>
      <div className="quiz-container">
        <h1>Quiz Application</h1>
        <QuestionDisplay />
      </div>
    </QuizProvider>
  );
};

export default App;