import { Link } from 'react-router';
import './UserAvatar.css';

export function UserAvatar() {
  const fullName = 'Mat Paul';
  const firstName = fullName.split(' ')[0];
  const profileInitials = fullName
    .split(' ')
    .slice(0, 2)
    .map((str) => str[0])
    .join('');

  return (
    <Link to="/user">
      <div className="user-avatar">
        <div className="avatar-circle">{profileInitials}</div>
        <span className="user-first-name">{firstName}</span>
      </div>
    </Link>
  );
}
