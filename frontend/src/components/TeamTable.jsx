import { List } from '@mui/material';
import EachTeamListItem from './EachTeamListItem';

function TeamsTable({ teams }) {
  return <List sx={{ paddingBlock: 0 }}>{teams?.map((el, i) => EachTeamListItem(el, i))}</List>;
}

export default TeamsTable;
