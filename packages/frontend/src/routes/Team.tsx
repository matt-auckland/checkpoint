import type { CheckInEntryWithName, Team } from 'shared';
import { PageTitle } from '../components/PageTitle';
import { StandUpEntry } from '../components/StandUpEntry';
import './team.css';
import { useSearchParams } from 'react-router-dom';
import { usePageTitle } from '~/context/PageTitleContext';
import { useEffect } from 'react';

type TeamQueryParams = {
  date?: string;
  userId?: string;
};

function useTeamQueryParams(): [
  TeamQueryParams,
  (params: TeamQueryParams) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const values: TeamQueryParams = {
    date: searchParams.get('date') ?? undefined,
    userId: searchParams.get('userId') ?? undefined,
  };

  const setTypedSearchParams = (params: TeamQueryParams) => {
    const newParams = new URLSearchParams();
    if (params.date) newParams.set('date', params.date);
    if (params.userId) newParams.set('userId', params.userId);
    setSearchParams(newParams);
  };

  return [values, setTypedSearchParams];
}

export default function TeamRoute() {
  const [{ date, userId }, setParams] = useTeamQueryParams();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(`Team ${teamData.name}`);
  }, [setTitle]);

  const teamData: Team = {
    _id: '123',
    members: [
      { fullName: 'Amuro Ray', _id: '123456' },
      { fullName: 'Sayla Mass', _id: '234567' },
      { fullName: 'Kai Shiden', _id: '345678' },
    ],
    name: 'White Base',
    standupHistory: {},
    latestCheckIns: [
      {
        date: new Date(),
        standupId: '222222',
        yesterday: 'Steal Gundam prototype mobile suit',
        today: 'Fight against Zeon',
        blockers: 'The Red Comet, Char!',
        userId: '123456',
        _id: '1111111',
      },
      {
        date: new Date(),
        standupId: '333333',
        yesterday: 'Monitor enemy communications',
        today: 'Coordinate bridge operations',
        blockers: 'Encrypted Zeon signals',
        userId: '234567',
        _id: '2222222',
      },
      {
        date: new Date(),
        standupId: '444444',
        yesterday: 'Perform mobile suit maintenance',
        today: 'Deploy to front line',
        blockers: 'Lack of spare parts',
        userId: '345678',
        _id: '3333333',
      },
    ],
  };

  const latestCheckIns: CheckInEntryWithName[] = teamData.latestCheckIns.map(
    (checkIn) => {
      const user = teamData.members.find((user) => user._id == checkIn.userId);
      return {
        ...checkIn,
        fullName: user?.fullName || '',
      };
    }
  );

  return (
    <div className="team-page">
      {latestCheckIns.map((checkIn) => {
        return <StandUpEntry entry={checkIn} />;
      })}
    </div>
  );
}
