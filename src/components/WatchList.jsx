import Loader from "./Loader";
import WatchMovie from "./WatchMovie";

export default function WatchList({ watchList, onSelectMovie, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="watch-list">
          {watchList?.map((movie) => (
            <WatchMovie
              movie={movie}
              key={movie.imdbID}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </ul>
      )}
    </>
  );
}
