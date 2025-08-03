import { useState } from 'react';
import './login.css';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../lib/api/authAPI';

export default function LoginRoute() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [formError, setFormError] = useState('');

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const updatePass = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    setIsLoggingIn(true);
    //handle login
    authAPI.login
      .post({
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setUser(res.user);
        setToken(res.token);
        navigate('/');
      })
      .catch((err: Error) => {
        setFormError(err.message);
      })
      .finally(() => setIsLoggingIn(false));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {formError && <p>{formError}</p>}

        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={updateEmail} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={updatePass}
        />
        <button type="submit" disabled={isLoggingIn}>
          Login!
        </button>
        <Link to="/signup">
          - If you don't have an account, click here to sign up -
        </Link>
      </form>
    </>
  );
}
