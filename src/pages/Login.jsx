import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function Login({ userList, setLoggedInUser, logoutMessage, clearLogoutMessage }) {
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  function handleLoginClick() {
    const foundUser = userList.find(
      (user) =>
        user.username === nameInput.trim() &&
        user.password === passwordInput.trim()
    );
  
    if (foundUser) {
      setLoggedInUser(foundUser);
      clearLogoutMessage();
      setLoginError('');
  
      fetch('https://api.quotable.io/random')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((quoteData) => {
          const quote = quoteData.content;
          const author = quoteData.author;
          alert(`Välkommen ${foundUser.username}!\n"${quote}"\n- ${author}`);
          navigate('/start');
        })

        .catch((error) => {
          console.error('Ett tekniskt fel uppstod, citatet kunde tyvärr inte hämtas. :', error);
          alert(`Välkommen ${foundUser.username}!\n(Ett tekniskt fel uppstod, citatet kunde tyvärr inte hämtas.)`);
          navigate('/start');
        });
    } else {
      setLoginError('Fel användarnamn eller lösenord.');
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Logga in</h2>
      {logoutMessage && (
        <p className="logout-message" onAnimationEnd={clearLogoutMessage}>
          {logoutMessage}
        </p>
      )}
      <div className="login-form">
        <input
          type="text"
          placeholder="Användarnamn"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLoginClick} className="login-button">
          Logga in
        </button>
        {loginError && <p className="login-error">{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;










