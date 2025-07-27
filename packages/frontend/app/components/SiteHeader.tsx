import { Link } from 'react-router';
import { UserAvatar } from './UserAvatar';
import './SiteHeader.css';

export function SiteHeader() {
  const isLoggedIn = true;
  return (
    <>
      <header className="site-header">
        <Link to="/" className="header-title">
          Check In ✅
        </Link>

        {isLoggedIn && <UserAvatar />}
      </header>
      <div>
        <Link to={'/'}> Home</Link>
        <Link to={'/login'}> login</Link>
        <Link to={'/signup'}> signup</Link>
        <Link to={'/user/123'}> user profile </Link>
        <Link to={'/team/123'}> team</Link>
        <Link to={'/team/123?date&userId'}> team standup</Link>
        <Link to={'/team/123/settings'}>team settings</Link>
      </div>
    </>
  );
}
