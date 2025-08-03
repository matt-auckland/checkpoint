import type { CheckInWithFullName, UserLite } from 'shared';
import { UserAvatar } from './UserAvatar';
import './checkinEntry.css';

type CheckInEntryProps = {
  entry: CheckInWithFullName;
};

export function CheckInEntry({ entry }: CheckInEntryProps) {
  const user: UserLite = {
    _id: entry.userId,
    fullName: entry.fullName,
  };

  console.log(entry);
  return (
    <article className="checkin-entry">
      <div className="top-section">
        <UserAvatar user={user} />
        <span>{user.fullName}</span>
        <span>
          {new Date(entry.createdAt).toLocaleDateString('en-NZ', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </span>
      </div>
      <main>
        <p className="yesterday"> {entry.yesterday}</p>
        <p className="today">{entry.today}</p>
        <p className="blockers">{entry.blockers}</p>
      </main>
    </article>
  );
}
