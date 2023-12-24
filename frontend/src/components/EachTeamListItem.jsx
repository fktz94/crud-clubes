import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Icon,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';

import { DeleteForever, Edit, Language } from '@mui/icons-material/';
import useDeleteTeam from '../hooks/useDeleteTeam';

function EachTeamListItem({ team, index, fetchTeams, handleDeletedTeam }) {
  const { id, name, website, crestUrl } = team;
  const { handleDelete, isDeleting, toggleDelete } = useDeleteTeam();

  const backgroundColor = index % 2 !== 0 ? 'text.disabled' : 'text.primary';

  const handleClick = () => {
    handleDelete(id);
    handleDeletedTeam(name);
    fetchTeams();
  };

  return (
    <>
      <Dialog
        open={isDeleting}
        PaperProps={{
          style: { color: 'ghostwhite', backgroundColor: 'rgba(0,0,0,0.97)', padding: 10 }
        }}
        onClose={() => {}}>
        <DialogTitle id="alert-dialog-title">{`¿Desea eliminar a ${name} de la lista?`}</DialogTitle>
        <DialogActions sx={{ margin: 'auto' }}>
          <Button variant="outlined" color="success" onClick={handleClick}>
            Aceptar
          </Button>
          <Button
            variant="outlined"
            id="cancel-update"
            color="error"
            onClick={toggleDelete}
            autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem key={id} sx={{ bgcolor: backgroundColor, alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar src={crestUrl} />
        </ListItemAvatar>
        <ListItemText primary={name} sx={{ width: '60%', minWidth: 'content' }} />
        <div className="flex grow justify-end gap-2">
          {website && (
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
          )}
          <Button variant="outlined" title="Edit team" color="success">
            <Link to={`/${id}`} className="absolute w-full h-full" />
            <Icon>
              <Edit sx={{ verticalAlign: 'top' }} />
            </Icon>
          </Button>
          <Button variant="outlined" color="error" title="Delete team" onClick={toggleDelete}>
            <Icon>
              <DeleteForever sx={{ verticalAlign: 'top' }} />
            </Icon>
          </Button>
        </div>
      </ListItem>
    </>
  );
}

export default EachTeamListItem;
