import Loader from "./Loader";
import SearchResults from "./SearchResults";
import WatchMovie from "./WatchMovie";
import Button from "./Button";
import NoResults from "./NoResults";

export default function WatchList({
  watchList,
  onSelectMovie,
  isLoading,
  setConfirmation,
  localQuery,
}) {
  const filteredData = watchList.filter((item) => {
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
              You have {watchList.length} titles on your list
            </span>
            {watchList.length > 0 && (
              <Button onClick={() => setConfirmation(true)}>CLEAR LIST</Button>
            )}
          </SearchResults>
          <ul className="watch-list">
            {filteredData?.map((movie) => (
              <WatchMovie
                movie={movie}
                key={movie.imdbID}
                onSelectMovie={onSelectMovie}
              />
            ))}
          </ul>
        </>
      )}
      {watchList.length === 0 && !localQuery && (
        <NoResults
          message={"Your Watch List is empty."}
          subMessage={"Start adding some movies!"}
        />
      )}

      {localQuery && filteredData.length === 0 && (
        <NoResults
          message={`No results found in your Watch List for "${localQuery}"`}
        />
      )}
    </>
  );
}
