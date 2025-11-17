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
  watched,
  onAddToWatchList,
  location,
  watchList,
  onRemoveMovie,
  onRemoveWatchedMovie,
}) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [watchedBox, setWatchedBox] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState("");
  const isMovieWatched = watched.some(
    (movie) => movie.imdbID === selectedMovie?.imdbID
  );
  const isMovieOnWatchList = watchList.some(
    (movie) => movie.imdbID === selectedMovie?.imdbID
  );

  const isFromWatchedList = location.pathname === "/watched";

  useEffect(() => {
    setUserRating(null);
    setComment("");
    setWatchedBox(false);
  }, [selectedMovie?.imdbID]);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!selectedMovie?.imdbID) return;

      try {
        const url = `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie.imdbID}`;
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
  }, [selectedMovie?.imdbID, KEY]);

  useEffect(() => {
    if (isFromWatchedList && selectedMovie) {
      const watchedMovie = watched.find(
        (movie) => movie.imdbID === selectedMovie.imdbID
      );
      if (watchedMovie) {
        setUserRating(watchedMovie.userRating);
        setComment(watchedMovie.comment || "");
      }
    }
  }, [isFromWatchedList, selectedMovie, watched]);

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

  function handleUpdateWatchedMovie() {
    if (!movieDetails) {
      console.error("No movie details available");
      return;
    }

    const updatedMovie = {
      imdbID: movieDetails.imdbID,
      title: movieDetails.Title,
      year: movieDetails.Year,
      poster: movieDetails.Poster,
      imdbRating: movieDetails.imdbRating,
      runtime: movieDetails.Runtime,
      userRating,
      comment,
      addedAt: selectedMovie.addedAt || new Date().toISOString(),
    };

    onRemoveWatchedMovie(selectedMovie.imdbID);
    onWatchedMovie(updatedMovie);
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
      addedAt: new Date().toISOString(),
    };

    onAddToWatchList(watchMovie);
    onClose();
  }

  function renderButtons() {
    if (location.pathname === "/watch") {
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

  const renderWatchedListContent = () => {
    const watchedMovie = watched.find(
      (movie) => movie.imdbID === selectedMovie.imdbID
    );

    return (
      <div className="feedback-wrapper">
        <div className="feedback">
          <div className="your-rating">
            <p>Your Rating</p>
            <div className="rating-display">
              <span className="star">⭐</span>
              <span className="rating-number">
                {watchedMovie?.userRating || "Not rated"}
              </span>
            </div>
          </div>
          <div className="your-comment">
            <p>Your Comment</p>
            <div className="comment-display">
              {watchedMovie?.comment
                ? `"${watchedMovie.comment}"`
                : "No comment added"}
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button onClick={() => setWatchedBox(true)}>Edit 🖊</Button>
          <Button
            className="delete-btn"
            onClick={() => onRemoveWatchedMovie(selectedMovie.imdbID)}
          >
            <span>-</span>Watched List
          </Button>
        </div>
      </div>
    );
  };

  const renderFullDetails = () => (
    <>
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
      <div className="buttons">{renderButtons()}</div>
    </>
  );

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
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
                <div className="stats">
                  <span className="rating">
                    <span>⭐</span>
                    {movieDetails?.imdbRating}
                  </span>
                  <span>{movieDetails?.Runtime}</span>
                </div>
              </div>
              {watchedBox ? (
                <Feedback
                  onAddToWatched={
                    isFromWatchedList
                      ? handleUpdateWatchedMovie
                      : handleAddToWatchedList
                  }
                  setUserRating={setUserRating}
                  setComment={setComment}
                  comment={comment}
                  userRating={userRating}
                />
              ) : isFromWatchedList ? (
                renderWatchedListContent()
              ) : (
                renderFullDetails()
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
