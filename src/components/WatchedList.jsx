import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched }) {
  return (
    <div className="watched-movie">
      <ul>
        {watched.map((movie) => (
          <WatchedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </div>
  );
}
