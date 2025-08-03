import { useEffect, useState } from 'react';
import './signup.css';
import { useAuth } from '../context/AuthContext.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../lib/api/authAPI.ts';
import { AppButton } from '~/components/AppButton.tsx';
import { usePageTitle } from '~/context/PageTitleContext.tsx';

export default function SignUpRoute() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Sign Up');
  }, [setTitle]);

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formError, setFormError] = useState('');

  const updateFullName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFullName(e.target.value);

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const updatePass = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const updatePassTwo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordTwo(e.target.value);

  function validateForm() {
    if (!password || !passwordTwo || !email || !fullName) {
      setFormError("Your haven't filled out everything, try again");
      return false;
    }

    if (password !== passwordTwo) {
      setFormError("Your passwords don't match");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) return;

    setFormError('');

    setIsSigningUp(true);
    //handle signup
    authAPI.signup
      .post({
        email,
        fullName,
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
      .finally(() => setIsSigningUp(false));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {formError && <p>{formError}</p>}

        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          name="full-name"
          value={fullName}
          onChange={updateFullName}
        />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={updateEmail} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={updatePass}
        />
        <label htmlFor="password">Reenter Password</label>
        <input
          type="password"
          name="password"
          value={passwordTwo}
          onChange={updatePassTwo}
        />
        <AppButton type="submit" disabled={isSigningUp}>
          Sign up!
        </AppButton>
        <Link to="/login">
          - Already have an account? Click here to log in -
        </Link>
      </form>
    </>
  );
}
