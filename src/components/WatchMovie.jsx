import noPoster from "../assets/no_poster.png";

export default function WatchMovie({ movie, onSelectMovie }) {
  return (
    <li className="movie" onClick={() => onSelectMovie(movie)}>
      <img
        src={movie?.poster}
        alt={`${movie?.title} poster`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = noPoster;
        }}
      />
      <h3>{movie?.title}</h3>
    </li>
  );
}
