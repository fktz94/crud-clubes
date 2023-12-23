import { List } from '@mui/material';
import EachTeamListItem from './EachTeamListItem';

function TeamsTable({ teams, fetchTeams }) {
  const mappedItems = teams?.map((team, index) => (
    <EachTeamListItem key={team.name} team={team} index={index} fetchTeams={fetchTeams} />
  ));

  return <List sx={{ paddingBlock: 0 }}>{mappedItems}</List>;
}

export default TeamsTable;
