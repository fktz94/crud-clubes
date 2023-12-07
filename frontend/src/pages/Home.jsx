import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TeamsTable from '../components/TeamTable';

function Home() {
  const [teams, setTeams] = useState();
  // const location = useLocation();
  // const [deletedTeam, setDeletedTeam] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchedData = await fetch('http://localhost:8080/api/v1/clubs');
        const json = await fetchedData.json();
        setTeams(json.data);
      } catch (error) {
        throw new Error(error.message || 'data not found');
      }
    })();
  }, []);

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
    teams && (
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
    )
  );
}

export default Home;
