import Button from "./Button";
import SearchResults from "./SearchResults";
import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ watched, isLoading, setConfirmation }) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchResults>
            You have {watched.length} titles on your list
            {watched.length > 0 && (
              <Button onClick={() => setConfirmation(true)}>CLEAR LIST</Button>
            )}
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
