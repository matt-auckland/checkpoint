import type { StandupEntryWithName, Team } from 'shared';
import { PageTitle } from '../components/PageTitle';
import { StandUpEntry } from '../components/StandUpEntry';
import './team.css';

export default function TeamRoute() {
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

  const latestCheckIns: StandupEntryWithName[] = teamData.latestCheckIns.map(
    (checkIn) => {
      const user = teamData.members.find((user) => user._id == checkIn.userId);
      return {
        ...checkIn,
        fullName: user?.fullName || '',
      };
    }
  );

  const pageTitle = teamData.name;

  return (
    <div className="team-page">
      <PageTitle title={pageTitle}> </PageTitle>
      {latestCheckIns.map((checkIn) => {
        return <StandUpEntry entry={checkIn} />;
      })}
    </div>
  );
}
