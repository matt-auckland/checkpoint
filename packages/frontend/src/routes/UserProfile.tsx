import { authAPI } from '../lib/api/authAPI';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '../components/AppButton';
import { usePageTitle } from '~/context/PageTitleContext';
import { useEffect } from 'react';

export default function UserProfileRoute() {
  const { user } = useAuth();
  const { setTitle } = usePageTitle();
  const { clearData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const displayName = user?.fullName.split(' ')[0] || user?.fullName;
    setTitle(`${displayName}'s Profile`);
  }, [user, setTitle]);

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
      <AppButton onClick={handleLogOut}>Log Out ):</AppButton>
    </>
  );
}
