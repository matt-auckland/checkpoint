import { Link } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import './SiteHeader.css';
import { useAuth } from '../context/AuthContext';

export function SiteHeader() {
  const { user } = useAuth();
  const isLoggedIn = user;
  return (
    <>
      <header className="site-header">
        <Link to="/" className="header-title">
          Checkpoint ✅
        </Link>

        {isLoggedIn && <UserAvatar user={user} showName />}
      </header>
      <div>
        <Link to={'/login'}>login</Link>
        <Link to={'/signup'}>signup</Link>
        <Link to={'/team/123'}>team</Link>
        <Link to={'/team/123?date&userId'}>team standup</Link>
        <Link to={'/team/123/settings'}>team settings</Link>
      </div>
    </>
  );
}
