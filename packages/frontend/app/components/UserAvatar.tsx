import { Link } from 'react-router';
import './UserAvatar.css';
import { useAuth } from '~/context/AuthContext';

export function UserAvatar() {
  const { user } = useAuth();

  const firstName = user?.fullName.split(' ')[0];
  const profileInitials = user?.fullName
    .split(' ')
    .slice(0, 2)
    .map((str) => str[0])
    .join('');

  return (
    <Link to={`/user/${user?._id}`}>
      <div className="user-avatar">
        <div className="avatar-circle">{profileInitials}</div>
        <span className="user-first-name">{firstName}</span>
      </div>
    </Link>
  );
}
