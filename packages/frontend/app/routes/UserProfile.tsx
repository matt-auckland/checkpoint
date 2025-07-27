import type { Route } from './+types/UserProfile';
import { Welcome } from '../welcome/welcome';
import { authAPI } from '~/lib/api/authAPI';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'USERNAME Profile' },
    { name: 'description', content: 'Profile for USERNAME' },
  ];
}

export const handle = {
  pageTitle: 'User Profile',
};

export default function UserProfileRoute() {
  const { user, clearData } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    authAPI.logout
      .post()
      .then((success) => {
        if (success) {
          clearData();
          navigate('/login');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <button onClick={handleLogOut}>Log Out ):</button>
    </>
  );
}
