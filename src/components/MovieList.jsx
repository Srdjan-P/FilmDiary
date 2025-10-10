import Movie from "./Movie";
import Loader from "./Loader";

export default function MovieList({ movies, onSelectMovie, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Loader />
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
