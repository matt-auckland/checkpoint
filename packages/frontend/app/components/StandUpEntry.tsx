import type { StandupEntryWithName, UserLite } from 'shared';
import { UserAvatar } from '~/components/UserAvatar';
import './standupEntry.css';

type StandUpEntryProps = {
  entry: StandupEntryWithName;
};

export function StandUpEntry({ entry }: StandUpEntryProps) {
  const user: UserLite = {
    _id: entry.userId,
    fullName: entry.fullName,
  };

  return (
    <article className="standup-entry">
      <div className="top-section">
        <UserAvatar user={user} />
        <span>{user.fullName}</span>
        <span>
          {new Date(entry.date).toLocaleDateString('en-NZ', {
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
