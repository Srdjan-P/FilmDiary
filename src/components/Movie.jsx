import noPoster from "../assets/no_poster.png";

export default function Movie({ movie, onSelectMovie }) {
  return (
    <li className="movie" onClick={() => onSelectMovie(movie)}>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = noPoster;
        }}
      />
      <h3>{movie.Title}</h3>
    </li>
  );
}
