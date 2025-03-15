import React, { useEffect, useState } from 'react';
import QuizProvider from './context/QuizContext';
import QuestionDisplay from './components/QuestionDisplay';
import ScoreBoard from './components/ScoreBoard';
import Auth from './components/Auth';
import VisionNavigationPanel from './components/VisionNavigationPanel';
import './styles/index.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      fetch(`${apiUrl}/api/questions`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec du chargement des questions');
          }
          return res.json();
        })
        .then((data) => {
          setQuestions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des questions :', error);
          setError(true);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Auth />;
  }

  if (loading) return <div>Loading...</div>;
  if (error || !questions.length)
    return <div>No questions available. Please try again later.</div>;

  return (
    <QuizProvider questions={questions}>
      <div className="app-layout">
        <div className="quiz-wrapper">
          <VisionNavigationPanel />
          <div className="quiz-container">
            <h1>Quiz Application</h1>
            <ScoreBoard />
            <QuestionDisplay />
          </div>
        </div>
      </div>
    </QuizProvider>
  );
};

export default App;