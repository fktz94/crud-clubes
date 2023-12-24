import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAllTeams() {
  const [teams, setTeams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deletedTeam, setDeletedTeam] = useState(undefined);

  const location = useLocation();

  const fakeRest = () =>
    new Promise((res) => {
      setTimeout(res, 300);
    });

  const handleDeletedTeam = useCallback((team) => {
    setDeletedTeam(team);
  }, []);

  const handleCloseDeletedTeamAlert = () => setDeletedTeam();

  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      await fakeRest();
      const fetchedData = await fetch('http://localhost:8080/api/v1/clubs');
      const json = await fetchedData.json();
      setTeams(json.data);
    } catch (error) {
      throw new Error(error.message || 'data not found');
    } finally {
      setIsLoading(false);
      setTimeout(handleCloseDeletedTeamAlert, 3000);
    }
  }, []);

  useEffect(() => {
    if (location.state?.deletedTeam) setDeletedTeam(location.state.deletedTeam);

    fetchTeams();

    setTimeout(handleCloseDeletedTeamAlert, 3000);

    return () => window.history.replaceState({}, document.title);
  }, [fetchTeams, location.state]);

  return {
    isLoading,
    teams,
    fetchTeams,
    handleDeletedTeam,
    deletedTeam,
    handleCloseDeletedTeamAlert
  };
}
