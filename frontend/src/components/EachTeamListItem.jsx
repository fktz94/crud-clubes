import { Link } from 'react-router-dom';
import { Avatar, Button, Icon, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { DeleteForever, Edit, Language } from '@mui/icons-material/';

function EachTeamListItem(team, index) {
  const { id, name, website, crestUrl } = team;

  const backgroundColor = index % 2 !== 0 ? 'text.disabled' : 'text.primary';

  return (
    <ListItem key={id} sx={{ bgcolor: backgroundColor, alignItems: 'center' }}>
      <ListItemAvatar>
        <Avatar src={crestUrl} />
      </ListItemAvatar>
      <ListItemText primary={name} sx={{ width: '60%', minWidth: 'content' }} />
      <div className="flex grow justify-between gap-2">
        <Button>
          <Link
            to={website}
            target="_blank"
            rel="noreferrer"
            title={`Visit ${website.split('//').slice(1)}`}
            className="absolute w-full h-full"
          />
          <Icon>
            <Language sx={{ verticalAlign: 'top' }} />
          </Icon>
        </Button>
        <Button variant="outlined" color="success">
          <Link to={`/${id}`} title="Edit" className="absolute w-full h-full" />
          <Icon>
            <Edit sx={{ verticalAlign: 'top' }} />
          </Icon>
        </Button>
        <Button variant="outlined" color="error">
          <Icon>
            <DeleteForever sx={{ verticalAlign: 'top' }} />
          </Icon>
        </Button>
      </div>
    </ListItem>
  );
}

export default EachTeamListItem;
