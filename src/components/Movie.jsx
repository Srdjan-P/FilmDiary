export default function Movie({ movie, onSelectMovie }) {
  return (
    <li className="movie" onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
    </li>
  );
}
