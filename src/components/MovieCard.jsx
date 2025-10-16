import { useEffect, useState } from "react";
import Button from "./Button";
import Loader from "./Loader";
import Feedback from "./Feedback";
import noPoster from "../assets/no_poster.png";

export default function MovieCard({
  selectedMovie,
  KEY,
  onClose,
  onWatchedMovie,
  userRating,
  setUserRating,
  comment,
  setComment,
  watched,
  onAddToWatchList,
  location,
  watchList,
  onRemoveMovie,
}) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [watchedBox, setWatchedBox] = useState(false);
  const isMovieWatched = watched.some(
    (movie) => movie.imdbID === selectedMovie?.imdbID
  );
  const isMovieOnWatchList = watchList.some(
    (movie) => movie.imdbID === selectedMovie?.imdbID
  );

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!selectedMovie?.imdbID) return;

      if (movieDetails?.imdbID === selectedMovie.imdbID) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const url = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie.imdbID}`;
        const res = await fetch(url);
        const data = await res.json();

        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedMovie?.imdbID, KEY, movieDetails]);

  function handleAddToWatchedList() {
    if (!movieDetails) {
      console.error("No movie details available");
      return;
    }

    const watchedMovie = {
      imdbID: movieDetails.imdbID,
      title: movieDetails.Title,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      imdbRating: movieDetails.imdbRating,
      runtime: movieDetails.Runtime,
      userRating,
      comment,
      addedAt: new Date().toISOString(),
    };

    onWatchedMovie(watchedMovie);
    onClose();
  }

  function handleAddToWatchList() {
    if (!movieDetails) {
      console.error("No movie details available");
      return;
    }

    const watchMovie = {
      imdbID: movieDetails.imdbID,
      title: movieDetails.Title,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      imdbRating: movieDetails.imdbRating,
      runtime: movieDetails.Runtime,
      userRating,
      comment,
      addedAt: new Date().toISOString(),
    };

    onAddToWatchList(watchMovie);
    onClose();
  }

  function renderButtons() {
    if (location.pathname !== "/") {
      return (
        <>
          <Button
            className="delete-btn"
            onClick={() => onRemoveMovie(selectedMovie.imdbID)}
          >
            <span>-</span>Watch List
          </Button>
          <Button onClick={() => setWatchedBox(true)}>
            <span>+ </span>Watched List
          </Button>
        </>
      );
    }

    if (isMovieWatched) {
      return <Button disabled>Already Watched</Button>;
    }

    if (isMovieOnWatchList) {
      return (
        <>
          <Button disabled>Already on Watch List</Button>
          <Button onClick={() => setWatchedBox(true)}>
            <span>+ </span>Watched List
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={handleAddToWatchList}>
          <span>+ </span>Watch List
        </Button>
        <Button onClick={() => setWatchedBox(true)}>
          <span>+</span>Watched List
        </Button>
      </>
    );
  }

  return (
    <div className="movie-card-wrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="movie-card">
          <span className="close" onClick={onClose}>
            ❌
          </span>
          <div className="movie-poster">
            <img
              src={movieDetails?.Poster}
              alt={`${movieDetails?.Title} poster`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noPoster;
              }}
            />
          </div>
          <div className="movie-details">
            <div className="movie-details-header">
              <div className="movie-title">{movieDetails?.Title}</div>
            </div>
            <div className="stats">
              <span className="rating">
                <span>⭐</span>
                {movieDetails?.imdbRating}
              </span>{" "}
              <span>{movieDetails?.Runtime}</span>
            </div>
            <div className="description">{movieDetails?.Plot}</div>
            {watchedBox ? (
              <Feedback
                onAddToWatched={handleAddToWatchedList}
                setUserRating={setUserRating}
                setComment={setComment}
                comment={comment}
                userRating={userRating}
              />
            ) : (
              <>
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
                <div className="buttons">{renderButtons()}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
