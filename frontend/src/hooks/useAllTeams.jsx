import { useCallback, useEffect, useState } from 'react';

export default function useAllTeams() {
  const [teams, setTeams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deletedTeam, setDeletedTeam] = useState(undefined);

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
      setTimeout(handleCloseDeletedTeamAlert, 4000);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    isLoading,
    teams,
    fetchTeams,
    handleDeletedTeam,
    deletedTeam,
    handleCloseDeletedTeamAlert
  };
}
