import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Avatar, Icon, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

function EachTeamListItem(team, index) {
  const { id, name, website, crestUrl } = team;

  const backgroundColor = index % 2 !== 0 ? 'text.disabled' : 'text.primary';

  return (
    <ListItem sx={{ bgcolor: backgroundColor, grid: '2fr' }}>
      <ListItemAvatar>
        <Avatar src={crestUrl} />
      </ListItemAvatar>
      <ListItemText primary={name} />
      <Icon>
        <LanguageIcon />
      </Icon>
    </ListItem>
  );
}

/* <li key={id} className="grid grid-cols-[3fr,2fr] border-b py-2">
      <span className="font-bold tracking-wider">{name}</span>
      <div className="flex items-end justify-between ">
        <Button>
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:text-sky-600 transition-colors">
            Website
          </a>
        </Button>

        <Button>
          <Link to={`/${id}`} className="hover:text-sky-600 transition-colors">
            Ver equipo
          </Link>
        </Button>
      </div>
    </li> */

export default EachTeamListItem;
