import Loader from "./Loader";
import SearchResults from "./SearchResults";
import WatchMovie from "./WatchMovie";

export default function WatchList({ watchList, onSelectMovie, isLoading }) {
  console.log(watchList.length);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchResults>
            You have {watchList.length} titles on your list
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
