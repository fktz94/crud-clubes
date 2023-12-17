/* eslint-disable react/prop-types */
import { Box, Button, Card, Container, List, ListItem, ListItemText } from '@mui/material';

function TeamData({ team, navigate, toggleEdit, isDeleting, toggleDelete }) {
  const { id, name, founded, clubColors, venue, address, phone, tla } = team;

  const deleteTeam = () => {
    fetch(`http://localhost:8080/${id}`, { method: 'DELETE' }).then(() => {
      navigate('/', { state: { name } });
    });
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
    <Container>
      {/* {isDeleting && (
        <div className="fixed flex items-center justify-center top-0 z-50 h-screen w-screen bg-black/75">
          <div className="h-36 w-80 flex flex-col items-center justify-center rounded bg-black/90">
            Really want to delete??
            <div className="flex mt-4 gap-6">
              <button
                type="button"
                onClick={deleteTeam}
                className="border px-2 py-1 hover:bg-red-500 hover:text-black">
                Yes
              </button>
              <button
                type="button"
                onClick={toggleDelete}
                className="border px-2 py-1 hover:bg-green-300 hover:text-black">
                No
              </button>
            </div>
          </div>
        </div>
      )} */}

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
  );
}

export default TeamData;
