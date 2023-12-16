import { Link, useLocation } from 'react-router-dom';
import TeamsTable from '../components/TeamTable';
import useAllTeams from '../hooks/useAllTeams';
import { Box, CircularProgress } from '@mui/material';

function Home() {
  // const location = useLocation();
  // const [deletedTeam, setDeletedTeam] = useState(false);
  const { isLoading, teams } = useAllTeams();
  // useEffect(() => {
  // if (location.state?.name) {
  //   setDeletedTeam(true);
  //   setTimeout(() => {
  //     location.state.name = undefined;
  //     setDeletedTeam(false);
  //   }, 1500);
  // }
  // }, [location.state, deletedTeam]);

  const teamsQuantity = teams?.length;

  return (
    <>
      {isLoading && (
        <Box width="100%" display="flex" className="justify-center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {teams && (
        <section className="flex flex-col gap-4 m-auto max-w-2xl">
          <TeamsTable teams={teams} />
        </section>

        //   {deletedTeam && (
        //     <div className="absolute px-4 py-2 z-50 rounded top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 bg-black/90">
        //       {location.state.name} ha sido eliminado
        //     </div>
        //   )}
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
