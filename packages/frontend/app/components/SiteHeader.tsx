import { Link } from 'react-router';
import { UserAvatar } from './UserAvatar';
import './SiteHeader.css';
import { useAuth } from '~/context/AuthContext';

export function SiteHeader() {
  const user = useAuth();
  const isLoggedIn = user;
  return (
    <>
      <header className="site-header">
        <Link to="/" className="header-title">
          Checkpoint ✅
        </Link>

        {isLoggedIn && <UserAvatar />}
      </header>
      <div>
        <Link to={'/'}> Home</Link>
        <Link to={'/login'}>login</Link>
        <Link to={'/signup'}>signup</Link>
        <Link to={'/user/123'}>user profile </Link>
        <Link to={'/team/123'}>team</Link>
        <Link to={'/team/123?date&userId'}>team standup</Link>
        <Link to={'/team/123/settings'}>team settings</Link>
      </div>
    </>
  );
}
