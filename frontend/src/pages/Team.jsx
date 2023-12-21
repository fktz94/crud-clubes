import { Link } from 'react-router-dom';

import { Button, Card, CardMedia, Container, Typography } from '@mui/material/';

import EditTeamForm from '../components/EditTeamForm';
import TeamData from '../components/TeamData';
import useOneTeam from '../hooks/useOneTeam';

function Team() {
  const {
    team,
    navigate,
    toggleEdit,
    isDeleting,
    isEditing,
    toggleDelete,
    handleSubmit,
    image,
    formData,
    handleInput,
    error,
    success,
    handleDeleteFile
  } = useOneTeam();

  return (
    team && (
      <Container>
        <Card
          sx={{
            margin: 'auto',
            padding: 2,
            maxWidth: 'sm',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
          <Button variant="outlined" sx={{ width: '50%', margin: 'auto' }}>
            <Link to="/">Volver al home</Link>
          </Button>
          <CardMedia
            sx={{ height: 250, width: '100%', backgroundSize: 'contain', mx: 'auto' }}
            image={image}
            alt="escudo del equipo"
          />
          <Typography variant="h2" component="h4" color="ghostwhite" textAlign="center">
            {team.name}
          </Typography>
          {!isEditing
            ? TeamData({ team, navigate, toggleEdit, isDeleting, toggleDelete })
            : EditTeamForm({
                team,
                handleSubmit,
                toggleEdit,
                handleInput,
                formData,
                error,
                success,
                handleDeleteFile
              })}
        </Card>
      </Container>
    )
  );
}

export default Team;
