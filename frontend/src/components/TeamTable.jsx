import { Box, Container, List } from '@mui/material';
import EachTeamListItem from './EachTeamListItem';

function TeamsTable({ teams }) {
  return (
    <Container>
      <List sx={{ paddingBlock: 0 }}>{teams?.map((el, i) => EachTeamListItem(el, i))}</List>
    </Container>
  );
}

export default TeamsTable;
