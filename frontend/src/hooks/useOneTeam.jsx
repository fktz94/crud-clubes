import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function useOneTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [rerun, setRerun] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const patchData = (e) =>
    fetch(`http://localhost:8080/api/v1/clubs/${team.id}`, {
      method: 'patch',
      body: new FormData(e.currentTarget)
    }).then(() => {
      setIsEditing(!isEditing);
      setRerun(true);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormFullfilled =
      Object.entries(Object.fromEntries(new FormData(e.currentTarget)))
        .map(([key, value]) => {
          if (value === '' || (key === 'file' && value.name === '')) {
            return false;
          }
          return true;
        })
        .filter((value) => value).length === 0;
    if (isFormFullfilled) return;
    patchData(e);
  };

  const toggleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  useEffect(() => {
    (async () => {
      try {
        const fetchedTeam = await fetch(`http://localhost:8080/api/v1/clubs/${id}`);
        const json = await fetchedTeam.json();
        setTeam(json.data);
      } catch (error) {
        throw new Error(error.message || 'Team not found');
      } finally {
        setRerun(false);
      }
    })();
  }, [id, rerun]);

  const imgSrc = team?.crestUrl?.includes('http')
    ? team?.crestUrl
    : `http://localhost:8080${team?.crestUrl}`;

  const noImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  return {
    team,
    navigate,
    toggleEdit,
    isDeleting,
    isEditing,
    toggleDelete,
    handleSubmit,
    imgSrc,
    noImg
  };
}
