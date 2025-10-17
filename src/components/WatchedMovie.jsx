import noPoster from "../assets/no_poster.png";

export default function WatchedMovie({ movie, onRemoveMovie }) {
  return (
    <>
      <li>
        <div className="delete-btn" onClick={() => onRemoveMovie(movie.imdbID)}>
          ❌
        </div>
        <div className="movie-poster">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noPoster;
            }}
          />
        </div>
        <div className="details">
          <div className="header">
            <span className="title">{movie.title}</span>
            <span className="star">⭐{movie.userRating}</span>
          </div>
          <div className="comment">
            {movie.comment ? `"${movie.comment}"` : "No Comment"}
          </div>
        </div>
      </li>
    </>
  );
}
