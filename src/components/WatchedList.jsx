import SearchResults from "./SearchResults";
import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchResults>
            You have {watched.length} titles on your list
          </SearchResults>
          <div className="watched-list">
            <ul>
              {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
