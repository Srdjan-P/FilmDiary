export default function WatchMovie({ movie, onSelectMovie }) {
  return (
    <li className="movie" onClick={() => onSelectMovie(movie)}>
      <img src={movie?.poster} alt={`${movie?.title} poster`} />
      <h3>{movie?.title}</h3>
    </li>
  );
}
