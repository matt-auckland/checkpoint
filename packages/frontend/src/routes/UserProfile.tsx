import { authAPI } from '../lib/api/authAPI';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '../components/AppButton';

export default function UserProfileRoute() {
  const { clearData } = useAuth();
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
      <AppButton onClick={handleLogOut}>Log Out ):</AppButton>
    </>
  );
}
