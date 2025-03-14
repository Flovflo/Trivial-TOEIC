import React, { useState } from 'react';
import '../styles/auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const endpoint = isLogin ? `${apiUrl}/api/login` : `${apiUrl}/api/signup`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || 'Erreur lors de la requête');
      } else {
        setMessage(data.message);
        if (isLogin && data.token) {
          localStorage.setItem('token', data.token);
          window.location.reload();
        }
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Connexion' : 'Création de compte'}</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nom d'utilisateur" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">{isLogin ? 'Se connecter' : 'S’inscrire'}</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Pas de compte ? Créez-en un !" : "Déjà un compte ? Connectez-vous !"}
        </p>
      </div>
    </div>
  );
};

export default Auth;