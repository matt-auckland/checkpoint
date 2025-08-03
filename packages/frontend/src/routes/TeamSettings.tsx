import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePageTitle } from '~/context/PageTitleContext';
import './teamSettings.css';
import {
  Team,
  TeamDataFull,
  TeamUpdateData,
  TeamUpdateSingleAPI,
} from 'shared/TeamTypes';
import { teamAPI } from '~/lib/api/teamAPI';
import { AppButton } from '~/components/AppButton';

export default function TeamSettingsRoute() {
  const { id: teamId } = useParams();
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [team, setTeam] = useState<TeamDataFull | Team | null>(null);

  const [newTeamName, setNewTeamName] = useState('');
  const [userIdToAdd, setUserIdToAdd] = useState('');
  const [userIdToRemove, setUserIdToRemove] = useState('');

  useEffect(() => {
    if (!teamId) {
      navigate('/');
      return;
    }

    if (!team && !isLoading) {
      loadTeamData(teamId);
      return;
    }

    setTitle(`Team ${team?.name ?? 'Unknown'} Settings`);
  }, [teamId, team, navigate, setTitle]);

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

  const updateTeam = (updatedData: TeamUpdateSingleAPI['Body']) => {
    if (isLoading || !team) {
      return;
    }
    const teamId = team._id.toString();
    setisLoading(true);
    teamAPI.one
      .updateTeam(teamId, updatedData)
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

  const addTeamMember = (userId: string) => {
    if (!team) return;
    setisLoading(true);
    teamAPI.one
      .addUsers([userId], team._id.toString())
      .then((updatedTeam) => {
        setTeam(updatedTeam);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const removeTeamMember = (userId: string) => {
    if (!team) return;
    setisLoading(true);
    teamAPI.one
      .deleteUser(userId, team._id.toString())
      .then((updatedTeam) => {
        setTeam(updatedTeam);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const changeTeamName = (newName: string) => {
    if (!team) return;
    const { _id, latestCheckIns, ...rest } = team;
    const updatedTeam: TeamUpdateData = {
      ...rest,
      name: newName,
    };
    updateTeam({ patchData: updatedTeam });
  };

  return (
    <>
      {team && (
        <div>
          <h2>Team Members</h2>
          <ul>
            {team.members.map((member) => (
              <li key={member._id.toString()}>
                {member.fullName ?? 'Unnamed'} ({member._id.toString()})
                <AppButton
                  onClick={() => setUserIdToRemove(member._id.toString())}
                >
                  Remove
                </AppButton>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTeamName) changeTeamName(newTeamName);
        }}
      >
        <h3>Update Team Name</h3>
        <input
          type="text"
          placeholder="New team name"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
        />
        <AppButton disabled={isLoading} type="submit">
          Confirm
        </AppButton>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (userIdToAdd) addTeamMember(userIdToAdd);
        }}
      >
        <h3>Add Team Member</h3>
        <input
          type="text"
          placeholder="User ID to add"
          value={userIdToAdd}
          onChange={(e) => setUserIdToAdd(e.target.value)}
        />
        <AppButton disabled={isLoading} type="submit">
          Confirm
        </AppButton>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (userIdToRemove) removeTeamMember(userIdToRemove);
        }}
      >
        <h3>Remove Team Member</h3>
        <input
          type="text"
          placeholder="User ID to remove"
          value={userIdToRemove}
          onChange={(e) => setUserIdToRemove(e.target.value)}
        />
        <AppButton disabled={isLoading} type="submit">
          Confirm
        </AppButton>
      </form>
    </>
  );
}
