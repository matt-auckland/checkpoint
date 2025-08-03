import { useAuth } from '../context/AuthContext';
import './home.css';
import { AppButton } from '../components/AppButton';
import { teamAPI } from '../lib/api/teamAPI';
import { Link, useNavigate } from 'react-router-dom';
import type { TeamLite, UserLite } from 'shared';
import { usePageTitle } from '~/context/PageTitleContext';
import { useEffect } from 'react';

export default function Home() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    const displayName = user?.fullName.split(' ')[0] || user?.fullName;
    setTitle(`Welcome back ${displayName}`);
  }, [setTitle, user]);

  const createNewTeam = () => {
    if (!user?._id) return;

    const userData: UserLite = {
      _id: user._id.toString(),
      fullName: user.fullName,
    };

    teamAPI.one
      .createTeam(userData)
      .then((newTeam) => {
        const { name, _id } = newTeam;
        const teamLite: TeamLite = {
          _id: _id.toString(),
          name,
        };

        const updatedUser = { ...user };
        updatedUser.teams.push(teamLite);
        setUser(updatedUser);

        navigate(`/team/${_id.toString()}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="homepage">
      <section>
        <h2>My Teams</h2>
        <ul>
          {user?.teams.map((team) => {
            return (
              <li key={team._id.toString()}>
                <Link to={`/team/${team._id.toString()}`}>{team.name}</Link>
              </li>
            );
          })}
        </ul>
        <AppButton onClick={createNewTeam}>Create a new team</AppButton>
      </section>
      <section>
        <h2>Recent Check Ins</h2>
        {user?.recentStandups?.length
          ? 'You have some!'
          : "You haven't checked in before!"}
      </section>
    </div>
  );
}
