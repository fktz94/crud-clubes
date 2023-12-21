import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import handleInputVerification from '../../utils/handleInputVerification';
import handleSubmitVerification from '../../utils/handleSubmitVerification';
import stateToFormData from '../../utils/stateToFormData';

export default function useOneTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [rerun, setRerun] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    tla: '',
    founded: '',
    clubColors: '',
    venue: '',
    address: '',
    phone: '',
    crestUrl: undefined
  });

  const [success, setSuccess] = useState({
    name: false,
    tla: false,
    founded: false,
    clubColors: false,
    venue: false,
    address: false,
    file: false
  });

  const [error, setError] = useState({
    name: '',
    tla: '',
    founded: '',
    clubColors: '',
    venue: '',
    address: '',
    phone: '',
    file: ''
  });

  const handleInput = (e) => {
    const {
      target: { name, files, value },
      nativeEvent: { data }
    } = e;

    if (!handleInputVerification(name, data, value, files, setError, setSuccess, setFormData))
      return;

    // CONTROLLED COMPONENTS
    if (name === 'tla') {
      setFormData((prev) => {
        return { ...prev, [name]: value.toUpperCase() };
      });
    } else {
      setFormData((prev) => {
        return { ...prev, [name]: files ? files[0] : value };
      });
    }
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const patchData = (data) => {
    fetch(`http://localhost:8080/api/v1/clubs/${team.id}`, {
      method: 'PATCH',
      body: data
    }).then(() => {
      setIsEditing(!isEditing);
      setRerun(true);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleSubmitVerification(formData, setError)) return;

    if (Object.values(error).filter((item) => item).length > 0) return;
    if (Object.values(formData).filter((item) => item).length === 0) return;

    patchData(stateToFormData(formData));

    setFormData({
      name: '',
      tla: '',
      founded: '',
      clubColors: '',
      venue: '',
      address: '',
      phone: ''
    });
  };

  const toggleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  const handleDeleteFile = () => {
    setFormData((prev) => {
      return { ...prev, crestUrl: undefined };
    });
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
    : `http://localhost:8080/${team?.crestUrl}`;

  const noImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  const image = team?.crestUrl ? imgSrc : noImg;

  return {
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
  };
}
