import { Link } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import './siteHeader.css';
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
    </>
  );
}
