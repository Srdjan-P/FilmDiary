export default function Movie({ movie }) {
  return (
    <li className="movie">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
    </li>
  );
}
