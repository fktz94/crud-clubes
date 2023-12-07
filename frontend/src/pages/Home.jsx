import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EachTeamListItem from '../components/EachTeamListItem';

function Home() {
  const [data, setData] = useState();
  const location = useLocation();
  const [deletedTeam, setDeletedTeam] = useState(false);

  useEffect(() => {
    if (location.state?.name) {
      setDeletedTeam(true);
      setTimeout(() => {
        location.state.name = undefined;
        setDeletedTeam(false);
      }, 1500);
    }
  }, [location.state, deletedTeam]);

  useEffect(() => {
    (async () => {
      try {
        const dats = await fetch('http://localhost:8080/');
        const json = await dats.json();
        setData(json);
      } catch (error) {
        throw new Error('data not found');
      }
    })();
  }, []);

  const teamsQuantity = data?.length;

  const teamsTable = () => {
    return <ul className="flex flex-col gap-2">{data.map((el) => EachTeamListItem(el))}</ul>;
  };

  return (
    data && (
      <section className="flex flex-col gap-4">
        {deletedTeam && (
          <div className="absolute px-4 py-2 z-50 rounded top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 bg-black/90">
            {location.state.name} ha sido eliminado
          </div>
        )}
        <div className="flex justify-between">
          <h4>
            Hay <b>{teamsQuantity}</b> equipos
          </h4>
          <Link to="/new-team" className="px-2 transition border hover:bg-black/50">
            Agregar un nuevo equipo
          </Link>
        </div>
        {teamsTable()}
      </section>
    )
  );
}

export default Home;
