import Button from "./Button";
import Loader from "./Loader";
import SearchResults from "./SearchResults";
import WatchedMovie from "./WatchedMovie";

export default function WatchedList({
  watched,
  isLoading,
  setConfirmation,
  onRemoveMovie,
  localQuery,
}) {
  const filteredData = watched.filter((item) => {
    if (!localQuery || localQuery === "") {
      return item;
    } else {
      const searchTerm = localQuery?.toLowerCase();
      const title = item.title || item.Title || "";

      return title?.toLowerCase().includes(searchTerm);
    }
  });

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
              You have {watched.length} titles on your list
            </span>
            {watched.length > 0 && (
              <Button onClick={() => setConfirmation(true)}>CLEAR LIST</Button>
            )}
          </SearchResults>
          <div className="watched-list">
            <ul>
              {filteredData.map((movie) => (
                <WatchedMovie
                  movie={movie}
                  key={movie.imdbID}
                  onRemoveMovie={onRemoveMovie}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
