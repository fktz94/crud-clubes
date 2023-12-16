import { List } from '@mui/material';
import EachTeamListItem from './EachTeamListItem';

function TeamsTable({ teams }) {
  const mappedItems = teams?.map((el, i) => EachTeamListItem(el, i));
  return <List sx={{ paddingBlock: 0 }}>{mappedItems}</List>;
}

export default TeamsTable;
