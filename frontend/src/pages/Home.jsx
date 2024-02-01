import { Link } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import TeamsTable from '../components/TeamTable';
import useAllTeams from '../hooks/useAllTeams';

function Home() {
  const {
    isLoading,
    teams,
    fetchTeams,
    deletedTeam,
    handleDeletedTeam,
    handleCloseDeletedTeamAlert
  } = useAllTeams();

  const teamsQuantity = teams?.length;

  if (teams?.length === 0) {
    return (
      <Container>
        <Box display="flex" flexDirection="column" marginBlock={4} gap={4}>
          <Typography variant="h4" alignSelf="center">
            No hay equipos!
          </Typography>
          <Button variant="outlined" sx={{ fontSize: '1.2rem', paddingBlock: 6 }}>
            <Link to="/new-team">Agrega el primer equipo</Link>
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      {isLoading && (
        <Box width="100%" display="flex" className="justify-center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {deletedTeam && (
        <Dialog open>
          <Alert
            variant="filled"
            onClose={handleCloseDeletedTeamAlert}>{`${deletedTeam} ha sido eliminado`}</Alert>
        </Dialog>
      )}

      {teams && !isLoading && (
        <>
          <Box
            display="flex"
            maxWidth="42rem"
            marginInline="auto"
            marginBlock={2}
            justifyContent="space-between">
            <Typography component="h4" alignSelf="center">
              Hay <b>{teamsQuantity}</b> {teamsQuantity === 1 ? 'equipo' : 'equipos'}
            </Typography>
            <Button variant="outlined">
              <Link to="/new-team">Agregar un nuevo equipo</Link>
            </Button>
          </Box>
          <section className="flex flex-col gap-4 m-auto max-w-2xl">
            <TeamsTable
              teams={teams}
              fetchTeams={fetchTeams}
              handleDeletedTeam={handleDeletedTeam}
            />
          </section>
        </>
      )}
    </>
  );
}

export default Home;
