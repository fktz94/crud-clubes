/* eslint-disable react/prop-types */

function InputElement({ name, placeholder, text, type = 'text' }) {
  return (
    <label htmlFor={name}>
      {text}{' '}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={`${placeholder || '---'}`}
        className="px-1 outline-none border border-transparent text-black focus:border-sky-400"
      />
    </label>
  );
}

function EditTeamForm({ data, handleSubmit, toggleEdit }) {
  return (
    <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
      <InputElement name="name" placeholder={data.name} text="Nuevo nombre del equipo:" />
      <InputElement name="tla" placeholder={data.tla} text="Abreviatura del equipo:" />
      <InputElement name="founded" placeholder={data.founded} text="Año fundación del club:" />
      <InputElement name="clubColors" placeholder={data.clubColors} text="Colores del equipo:" />
      <InputElement name="venue" placeholder={data.venue} text="Nuevo nombre del estadio:" />
      <InputElement name="address" placeholder={data.address} text="Dirección:" />
      <InputElement name="phone" placeholder={data.phone} text="Teléfono:" />
      <InputElement name="file" text="Nuevo logo del club:" type="file" />
      <input
        type="submit"
        className="w-1/2 transition border cursor-pointer hover:bg-black/50"
        value="Enviar"
      />
      <button
        type="button"
        className="w-1/2 transition border hover:bg-black/50"
        onClick={toggleEdit}>
        Salir sin editar
      </button>
    </form>
  );
}

export default EditTeamForm;
