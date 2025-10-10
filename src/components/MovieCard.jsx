import { useEffect, useState } from "react";

export default function MovieCard({ selectedMovie, KEY, onClose }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!selectedMovie?.imdbID) return;
      setIsLoading(true);

      try {
        const url = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie.imdbID}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedMovie?.imdbID, KEY]);

  console.log(movieDetails);

  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <div className="movie-poster">
          <img src={movieDetails?.Poster} alt="" />
        </div>
        <div className="movie-details">
          <div className="movie-details-header">
            <div className="movie-title">{movieDetails?.Title}</div>
            <span className="close" onClick={onClose}>
              ❌
            </span>
          </div>
          <div className="stats">
            <span className="rating">
              <span>⭐</span>
              {movieDetails?.imdbRating}
            </span>{" "}
            <span>{movieDetails?.Runtime}</span>
          </div>
          <div className="description">{movieDetails?.Plot}</div>
          <div className="elements">
            <div className="row">
              <span className="type">Country:</span>
              <span className="data">{movieDetails?.Country}</span>
            </div>
            <div className="row">
              <span className="type">Genre:</span>
              <span className="data">{movieDetails?.Genre}</span>
            </div>
            <div className="row">
              <span className="type">Released:</span>
              <span className="data">{movieDetails?.Released}</span>
            </div>
            <div className="row">
              <span className="type">Director:</span>
              <span className="data">{movieDetails?.Director}</span>
            </div>
            <div className="row">
              <span className="type">Casts:</span>
              <span className="data">{movieDetails?.Actors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
