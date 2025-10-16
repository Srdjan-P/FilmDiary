import Movie from "./Movie";
import Loader from "./Loader";

export default function MovieList({ movies, onSelectMovie, isLoading }) {
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <ul className="movie-list">
          {movies?.map((movie) => (
            <Movie
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
