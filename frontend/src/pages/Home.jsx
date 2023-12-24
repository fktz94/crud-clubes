import { Link, useLocation } from 'react-router-dom';
import { Alert, Box, CircularProgress, Dialog } from '@mui/material';
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

  // const teamsQuantity = teams?.length;

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
        <section className="flex flex-col gap-4 m-auto max-w-2xl">
          <TeamsTable teams={teams} fetchTeams={fetchTeams} handleDeletedTeam={handleDeletedTeam} />
        </section>

        //   <div className="flex justify-between">
        //     <h4>
        //       Hay <b>{teamsQuantity}</b> equipos
        //     </h4>
        //     <Link to="/new-team" className="px-2 transition border hover:bg-black/50">
        //       Agregar un nuevo equipo
        //     </Link>
        //   </div>
      )}
    </>
  );
}

export default Home;
