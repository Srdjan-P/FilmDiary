import Button from "./Button";
import Loader from "./Loader";
import SearchResults from "./SearchResults";
import WatchedMovie from "./WatchedMovie";

export default function WatchedList({
  watched,
  isLoading,
  setConfirmation,
  setWatched,
}) {
  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
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
                <WatchedMovie
                  movie={movie}
                  key={movie.imdbID}
                  onRemoveMovie={handleRemoveMovie}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
