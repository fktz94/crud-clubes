import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditTeamForm from '../components/EditTeamForm';
import TeamData from '../components/TeamData';

function Team() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rerun, setRerun] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const dats = await fetch(`http://localhost:8080/${id}`);
        const json = await dats.json();
        setData(json);
      } catch (error) {
        throw new Error('data not found');
      } finally {
        setRerun(false);
      }
    })();
  }, [id, rerun]);

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.entries(Object.fromEntries(new FormData(e.currentTarget)))
        .map(([key, value]) => {
          if (value === '' || (key === 'file' && value.name === '')) {
            return false;
          }
          return true;
        })
        .filter((value) => value).length === 0
    )
      return;

    fetch(`http://localhost:8080/${data.id}`, {
      method: 'post',
      body: new FormData(e.currentTarget)
    }).then(() => {
      setIsEditing(!isEditing);
      setRerun(true);
    });
  };

  const toggleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  const imgSrc = data?.crestUrl?.includes('http')
    ? data?.crestUrl
    : `http://localhost:8080${data?.crestUrl}`;
  const noImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  return (
    data && (
      <article className="px-6 py-4 flex flex-col gap-2 items-center justify-center border">
        <Link to="/" className="px-2 transition border hover:bg-black/50">
          Volver al home
        </Link>
        <img
          src={data.crestUrl ? imgSrc : noImg}
          alt="escudo del equipo"
          className="max-w-[200px]"
        />
        <h2 className="text-3xl font-bold tracking-wide">{data.name}</h2>
        {!isEditing
          ? TeamData({ data, navigate, toggleEdit, isDeleting, toggleDelete })
          : EditTeamForm({ data, handleSubmit, toggleEdit })}
      </article>
    )
  );
}

export default Team;
