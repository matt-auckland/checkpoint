import type {
  CheckInFull,
  CheckInWithFullName,
  NewCheckInEntry,
  TeamDataFull,
  UserLite,
} from 'shared';
import { CheckInEntry } from '../components/CheckInEntry';
import './team.css';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { usePageTitle } from '~/context/PageTitleContext';
import { useEffect, useState, useRef } from 'react';
import { teamAPI } from '~/lib/api/teamAPI';
import { AppButton } from '~/components/AppButton';
import { checkinAPI } from '~/lib/api/checkInAPI';
import { useAuth } from '~/context/AuthContext';

type TeamQueryParams = {
  date?: string;
};

function useTeamQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const values: TeamQueryParams = {
    date: searchParams.get('date') ?? undefined,
  };

  const setTeamQueryParams = (params: TeamQueryParams) => {
    const newParams = new URLSearchParams();
    if (params.date) newParams.set('date', params.date);
    setSearchParams(newParams);
  };

  return { ...values, setTeamQueryParams };
}

type TeamRouteParams = {
  id: string;
};

export default function TeamRoute() {
  const { user } = useAuth();
  const { setTitle } = usePageTitle();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [team, setTeam] = useState<TeamDataFull | null>(null);
  const [hasCheckedInToday] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { id: teamId } = useParams<TeamRouteParams>();
  const { date } = useTeamQueryParams();

  useEffect(() => {
    if (!team && teamId && !isLoading) {
      loadTeamData(teamId, date);
      return;
    }
    setTitle(`Team ${team?.name || ''}`);
    // TODO if the user has checked in today disable check in button?
  }, [setTitle, team, teamId]);

  const loadTeamData = (teamId: string, date?: string) => {
    if (isLoading || !teamId) {
      return;
    }
    setisLoading(true);
    teamAPI.one
      .get(teamId, date)
      .then((teamData) => {
        setTeam(teamData);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const openCheckInForm = () => dialogRef.current?.showModal();
  const closeCheckInForm = () => dialogRef.current?.close();

  const addNewCheckIn = (newCheckIn: CheckInFull) => {
    if (!team) return;
    const updatedTeam: TeamDataFull = { ...team };

    const newCheckInWithFullName: CheckInWithFullName = {
      ...newCheckIn,
      fullName: user?.fullName || '',
    };

    if (updatedTeam.checkIns.length == 5) {
      updatedTeam.checkIns?.push(newCheckInWithFullName);
    }
    updatedTeam.latestCheckIns?.pop();
    updatedTeam.latestCheckIns?.unshift(newCheckInWithFullName);
    setTeam(updatedTeam);
  };

  if (isLoading) {
    return <div className="team-page"> Loading team data...</div>;
  }
  if (error) {
    return (
      <div className="team-page">
        <div>There was an error loading team data</div>
        <div>{JSON.stringify(team)}</div>
        <Link to="/">Go home</Link>
      </div>
    );
  }

  return (
    <div className="team-page">
      <header>
        <Link to={`/team/${teamId}/settings`}>Team Settings</Link>
        <label htmlFor="date-filter">
          Filter entries by date
          <input type="date" name="date-filter" id="" />
        </label>

        {hasCheckedInToday ? (
          <AppButton onClick={openCheckInForm} disabled={hasCheckedInToday}>
            Edit Today's Check In
          </AppButton>
        ) : (
          <AppButton onClick={openCheckInForm} disabled={hasCheckedInToday}>
            Check In Today
          </AppButton>
        )}
      </header>
      <section className="team-members">
        <h2>Team members</h2>
        <ul>
          {team?.members.map((member: UserLite) => {
            return <li> {member.fullName}</li>;
          })}
        </ul>
      </section>
      <section className="latest-checkins">
        <h2>Latest Checkins</h2>
        {team?.latestCheckIns.map((checkIn: CheckInWithFullName) => {
          return <CheckInEntry entry={checkIn} />;
        })}
      </section>
      <dialog ref={dialogRef}>
        {team && user && (
          <CheckInForm
            userId={user?._id?.toString() || ''}
            teamId={team?._id?.toString() || ''}
            closeCheckInForm={closeCheckInForm}
            addNewCheckIn={addNewCheckIn}
          />
        )}
      </dialog>
    </div>
  );
}

type CheckInFormProps = {
  userId: string;
  teamId: string;
  closeCheckInForm: () => void;
  addNewCheckIn: (checkin: CheckInFull) => void;
};

function CheckInForm({
  userId,
  teamId,
  closeCheckInForm,
  addNewCheckIn,
}: CheckInFormProps) {
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const canSubmit = yesterday && today;

  const submitForm = (e: React.FormEvent) => {
    if (submitting) return;
    e.preventDefault();
    setError(null);

    setSubmitting(true);
    const entry: NewCheckInEntry = {
      blockers,
      today,
      yesterday,
      teamId,
      userId,
    };
    checkinAPI.one
      .createCheckIn(entry)
      .then((newCheckIn) => {
        addNewCheckIn(newCheckIn);
        closeCheckInForm();
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form className="checkin-form" onSubmit={submitForm}>
      {error && <p> {JSON.stringify(error)}</p>}
      <label className="label-yesterday" htmlFor="yesterday">
        What did you do yesterday?
      </label>
      <textarea
        className="input-yesterday"
        value={yesterday}
        onChange={(e) => setYesterday(e.target.value)}
      />

      <label className="label-today" htmlFor="today">
        What are you doing today?
      </label>
      <textarea
        className="input-today"
        value={today}
        onChange={(e) => setToday(e.target.value)}
      />

      <label className="label-blockers" htmlFor="blockers">
        Any blockers?
      </label>
      <textarea
        className="input-blockers"
        value={blockers}
        onChange={(e) => setBlockers(e.target.value)}
      />

      <AppButton type="submit" disabled={submitting || !canSubmit}>
        Submit
      </AppButton>
      <AppButton onClick={closeCheckInForm} disabled={submitting}>
        Cancel
      </AppButton>
    </form>
  );
}
