/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function TeamData({ team, navigate, toggleEdit, isDeleting, toggleDelete, handleDelete }) {
  const { id, name, founded, clubColors, venue, address, phone, tla } = team;

  const deleteTeam = () => {
    handleDelete(id);
    navigate('/', { state: { deletedTeam: name } });
  };

  const info = (dataInfo) => {
    return dataInfo || 'Sin información';
  };

  const listItem = (text, data) => {
    return (
      <ListItem
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: 'whitesmoke' }}>
        <ListItemText secondary={text} secondaryTypographyProps={{ color: 'gray' }} />
        <ListItemText primary={data} />
      </ListItem>
    );
  };

  return (
    <>
      <Dialog
        open={isDeleting}
        PaperProps={{
          style: { color: 'ghostwhite', backgroundColor: 'rgba(0,0,0,0.97)', padding: 10 }
        }}
        onClose={() => {}}>
        <DialogTitle id="alert-dialog-title">{`¿Desea eliminar a ${name}?`}</DialogTitle>
        <DialogActions sx={{ margin: 'auto' }}>
          <Button variant="outlined" color="success" onClick={deleteTeam}>
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
      <Container>
        <Card variant="outlined" sx={{ backgroundColor: 'rgba(0,0,0,0.3)', borderColor: 'gray' }}>
          <List sx={{ maxWidth: '90%', margin: 'auto' }}>
            {listItem(`Fundado en:`, info(founded))}
            {listItem(`Abreviatura:`, info(tla))}
            {listItem(`Colores del club:`, info(clubColors))}
            {listItem(`Nombre del estadio:`, info(venue))}
            {listItem(`Dirección:`, info(address))}
            {listItem(`Telefono:`, info(phone))}
          </List>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4, mb: 1 }}>
          <Button onClick={toggleEdit} variant="outlined">
            Editar equipo
          </Button>
          <Button onClick={toggleDelete} variant="outlined" color="error">
            Eliminar equipo
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default TeamData;
