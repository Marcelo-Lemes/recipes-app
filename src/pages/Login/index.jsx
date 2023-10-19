import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { LuChefHat } from 'react-icons/lu';
import { MIN_PASSWORD_LENGTH } from '../../helpers/constants';
import { setLocalStorage } from '../../helpers/localStorage';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validation = () => validator.isEmail(email) && password.length
   > MIN_PASSWORD_LENGTH;

  const handleClick = () => {
    setLocalStorage('user', { email });
    history.push('/meals');
  };

  return (
    <div id="login-box">
      <section id="login-container">
        <LuChefHat id="login-logo" />
        <input
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
          className="login-inputs"
        />
        <input
          className="login-inputs"
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validation() }
          onClick={ handleClick }
          id="login-button"
        >
          login
        </button>
      </section>
    </div>
  );
}
