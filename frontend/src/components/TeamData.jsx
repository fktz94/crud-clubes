/* eslint-disable react/prop-types */
function TeamData({ data, navigate, toggleEdit, isDeleting, toggleDelete }) {
  const { id, name, founded, clubColors, venue, address, phone, tla } = data;

  const deleteTeam = () => {
    fetch(`http://localhost:8080/${id}`, { method: 'DELETE' }).then(() => {
      navigate('/', { state: { name } });
    });
  };

  const info = (dataInfo) => {
    return <b>{dataInfo || 'Sin información'}</b>;
  };

  return (
    <>
      {isDeleting && (
        <div className="fixed flex items-center justify-center top-0 z-50 h-screen w-screen bg-black/75">
          <div className="h-36 w-80 flex flex-col items-center justify-center rounded bg-black/90">
            Really want to delete??
            <div className="flex mt-4 gap-6">
              <button
                type="button"
                onClick={deleteTeam}
                className="border px-2 py-1 hover:bg-red-500 hover:text-black">
                Yes
              </button>
              <button
                type="button"
                onClick={toggleDelete}
                className="border px-2 py-1 hover:bg-green-300 hover:text-black">
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <span>Fundado en: {info(founded)}</span>
      <span>Abreviatura: {info(tla)}</span>
      <span>Colores del club: {info(clubColors)}</span>
      <span>Nombre del estadio: {info(venue)}</span>
      <span>Dirección: {info(address)}</span>
      <span>Telefono: {info(phone)}</span>
      <button
        type="button"
        className="w-1/2 transition border hover:bg-black/50"
        onClick={toggleEdit}>
        Editar equipo
      </button>
      <button
        type="button"
        onClick={toggleDelete}
        className="w-1/2 transition border hover:bg-black/50">
        Eliminar equipo
      </button>
    </>
  );
}

export default TeamData;
