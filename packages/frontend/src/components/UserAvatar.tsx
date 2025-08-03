import { Link } from 'react-router-dom';
import './userAvatar.css';
import type { User, UserLite } from 'shared';

type UserAvatarProps = {
  user: User | UserLite;
  showName?: boolean;
};

export function UserAvatar({ user, showName = false }: UserAvatarProps) {
  const firstName = user?.fullName.split(' ')[0];
  const profileInitials = user?.fullName
    .split(' ')
    .slice(0, 2)
    .map((str) => str[0])
    .join('');

  return (
    <div className="user-avatar">
      <span className="avatar-circle">{profileInitials}</span>
      <Link to={`/user/${user?._id}`}>
        {showName && <span className="user-first-name">{firstName}</span>}
      </Link>
    </div>
  );
}
