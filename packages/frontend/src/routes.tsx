import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import LoginRoute from './routes/Login';
import SignUpRoute from './routes/SignUp';
import UserProfileRoute from './routes/UserProfile';
import BaseLayout from './routes/BaseLayout';
import Home from './routes/Home';
import TeamRoute from './routes/Team';
import TeamSettingsRoute from './routes/TeamSettings';
import { useAuth } from './context/AuthContext';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuth();

  const isAuthenticated = token && user;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const RequireGuest = ({ children }: { children: React.ReactNode }) => {
  const { token, user, clearData } = useAuth();

  const isGuest = !token || !user;

  if (isGuest) {
    clearData(); // in case we're in a funny state with user or token but not both
    return <>{children}</>;
  } else {
    <Navigate to="/" replace />;
  }
};

const AuthLayout = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};

const GuestLayout = () => {
  return (
    <RequireGuest>
      <Outlet />
    </RequireGuest>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <GuestLayout />,
        children: [
          { path: 'login', element: <LoginRoute /> },
          { path: 'signup', element: <SignUpRoute /> },
        ],
      },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'user/:id', element: <UserProfileRoute /> },
          { path: 'team/:id', element: <TeamRoute /> },
          { path: 'team/:id/settings', element: <TeamSettingsRoute /> },
        ],
      },
    ],
  },
]);
