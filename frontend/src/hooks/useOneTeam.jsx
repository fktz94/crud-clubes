import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import handleInputVerification from '../../utils/handleInputVerification';
import handleSubmitVerification from '../../utils/handleSubmitVerification';
import stateToFormData from '../../utils/stateToFormData';

export default function useOneTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const fakeRest = () =>
    new Promise((res) => {
      setTimeout(res, 300);
    });

  const [formData, setFormData] = useState({
    name: '',
    tla: '',
    founded: '',
    clubColors: '',
    venue: '',
    address: '',
    phone: '',
    website: '',
    crestUrl: ''
  });

  const [success, setSuccess] = useState({
    name: false,
    tla: false,
    founded: false,
    clubColors: false,
    venue: false,
    address: false,
    website: false,
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
    website: '',
    file: ''
  });

  const removePrevFileData = () =>
    setFormData((prev) => {
      return { ...prev, crestUrl: '' };
    });

  const handleInput = (e) => {
    const {
      target: { name, files, value },
      nativeEvent: { data }
    } = e;

    if (!handleInputVerification(name, data, value, setError, setSuccess)) return;

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

  const toggleUpdate = (e) => {
    e.preventDefault();
    if (e.target.id === 'cancel-update') {
      setIsUpdating(false);
      return;
    }
    const isCreating = e.target.id === 'isCreating';

    if (handleSubmitVerification(formData, setError, isCreating)) return;

    if (Object.values(error).filter((item) => item).length > 0) return;
    if (Object.values(formData).filter((item) => item).length === 0) return;
    setIsUpdating(true);
  };

  const fetchTeam = useCallback(async () => {
    if (id) {
      try {
        setIsLoading(true);
        await fakeRest();
        const fetchedTeam = await fetch(`http://localhost:8080/api/v1/clubs/${id}`);
        const json = await fetchedTeam.json();
        setTeam(json.data);
      } catch (err) {
        throw new Error(err.message || 'Team not found');
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  const patchData = (data) => {
    fetch(`http://localhost:8080/api/v1/clubs/${team.id}`, {
      method: 'PATCH',
      body: data
    }).then(() => {
      setIsEditing(false);
      setIsUpdating(false);
      fetchTeam();
    });
  };

  const postData = (data) => {
    fetch('http://localhost:8080/api/v1/clubs/', {
      method: 'post',
      body: data
    })
      .then((res) => res.json())
      .then((json) => navigate(`/${json.data.id}`));
  };

  const handleSubmit = (e) => {
    if (e.target.id === 'create-new-team') {
      postData(stateToFormData(formData));
    } else if (e.target.id === 'update-new-team') {
      patchData(stateToFormData(formData));
    }

    setIsEditing(false);
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

  const handleDeleteFile = () => {
    setFormData((prev) => {
      return { ...prev, crestUrl: undefined };
    });
  };

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const imgSrc = team?.crestUrl?.includes('http')
    ? team?.crestUrl
    : `http://localhost:8080/img/${team?.crestUrl}`;

  const noImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  const image = team?.crestUrl ? imgSrc : noImg;

  return {
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
  };
}
