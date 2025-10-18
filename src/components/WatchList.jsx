import Loader from "./Loader";
import SearchResults from "./SearchResults";
import WatchMovie from "./WatchMovie";
import Button from "./Button";

export default function WatchList({
  watchList,
  onSelectMovie,
  isLoading,
  setConfirmation,
}) {
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <SearchResults>
            <span className="text">
              You have {watchList.length} titles on your list
            </span>
            {watchList.length > 0 && (
              <Button onClick={() => setConfirmation(true)}>CLEAR LIST</Button>
            )}
          </SearchResults>
          <ul className="watch-list">
            {watchList?.map((movie) => (
              <WatchMovie
                movie={movie}
                key={movie.imdbID}
                onSelectMovie={onSelectMovie}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
