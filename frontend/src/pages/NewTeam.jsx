/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function InputElement({ name, error, placeholder, text, type = 'text' }) {
  return (
    <label htmlFor={name} className="relative w-fit">
      {text}{' '}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={`${placeholder}`}
        className={`px-1 outline-none border border-transparent ${
          error && name === 'name' ? 'border-red-400' : ''
        } text-black focus:border-sky-400`}
      />
      {error && (
        <span className="absolute text-xs top-1 ml-1 whitespace-nowrap text-red-400">
          Nombre requerido
        </span>
      )}
    </label>
  );
}

function NewTeam() {
  const navigate = useNavigate();
  const [isName, setIsName] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!e.currentTarget.name.value) {
      setIsName(true);
      return;
    }

    fetch('http://localhost:8080/new-team', {
      method: 'post',
      body: new FormData(e.currentTarget)
    })
      .then((res) => res.json())
      .then((data) => navigate(`/${data.id}`));
  };

  return (
    <form className="flex flex-col items-center gap-2" onSubmit={handleUpload}>
      <h3 className="text-3xl font-bold tracking-wider mb-4">Nuevo equipo</h3>
      <InputElement error={isName} name="name" placeholder="Chelsea FC" text="Nombre del equipo:" />
      <InputElement name="tla" placeholder="CHE" text="Abreviatura:" />
      <InputElement name="founded" placeholder="1905" text="Año fundación del club:" />
      <InputElement name="website" placeholder="www.chelseafc.com" text="Website del club:" />
      <InputElement name="clubColors" placeholder="Blue / White" text="Colores del equipo:" />
      <InputElement name="venue" placeholder="Stamford Bridge" text="Nombre del estadio:" />
      <InputElement name="email" placeholder="chelsea@chelsea.com" text="E-mail del club:" />
      <InputElement name="file" text="Logo del club:" type="file" />
      <input
        type="submit"
        className="w-1/3 transition border cursor-pointer hover:bg-black/50"
        value="Enviar"
      />
      <Link to="/" className="w-1/3 text-center transition border hover:bg-black/50">
        Salir sin crear
      </Link>
    </form>
  );
}

export default NewTeam;
