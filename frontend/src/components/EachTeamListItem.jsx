import { Link } from 'react-router-dom';

function EachTeamListItem(team) {
  const { id, name, website } = team;
  return (
    <li key={id} className="grid grid-cols-[2fr,1fr] border-b py-2">
      <span className="font-bold tracking-wider">{name}</span>
      <div className="flex items-end justify-between ">
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="text-xs hover:text-sky-600 transition-colors">
          Website
        </a>

        <span className="text-right">
          <Link to={`/${id}`} className="hover:text-sky-600 transition-colors">
            Ver equipo
          </Link>
        </span>
      </div>
    </li>
  );
}

export default EachTeamListItem;
