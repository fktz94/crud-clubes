import { List } from '@mui/material';
import EachTeamListItem from './EachTeamListItem';

function TeamsTable({ teams, fetchTeams, handleDeletedTeam }) {
  const mappedItems = teams?.map((team, index) => (
    <EachTeamListItem
      key={team.name}
      team={team}
      index={index}
      fetchTeams={fetchTeams}
      handleDeletedTeam={handleDeletedTeam}
    />
  ));

  return <List sx={{ paddingBlock: 0 }}>{mappedItems}</List>;
}

export default TeamsTable;
