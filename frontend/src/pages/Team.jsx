import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Typography
} from '@mui/material/';
import EditTeamForm from '../components/EditTeamForm';
import TeamData from '../components/TeamData';
import useOneTeam from '../hooks/useOneTeam';
import useDeleteTeam from '../hooks/useDeleteTeam';

function Team() {
  const {
    team,
    navigate,
    toggleEdit,
    isEditing,
    handleSubmit,
    image,
    formData,
    handleInput,
    error,
    success,
    handleDeleteFile,
    toggleUpdate,
    isUpdating,
    isLoading,
    removePrevFileData
  } = useOneTeam();

  const { isDeleting, toggleDelete, handleDelete } = useDeleteTeam();

  const [fileIsLink, setFileIsLink] = useState(false);

  const handleFileLink = () => {
    removePrevFileData();
    setFileIsLink(!fileIsLink);
  };
  return (
    <>
      {isLoading && (
        <Box width="100%" display="flex" className="justify-center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {team && !isLoading && (
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
              ? TeamData({ team, navigate, toggleEdit, isDeleting, toggleDelete, handleDelete })
              : EditTeamForm({
                  team,
                  handleSubmit,
                  toggleEdit,
                  handleInput,
                  formData,
                  error,
                  success,
                  handleDeleteFile,
                  toggleUpdate,
                  isUpdating,
                  fileIsLink,
                  handleFileLink
                })}
          </Card>
        </Container>
      )}
    </>
  );
}

export default Team;
