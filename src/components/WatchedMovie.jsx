import noPoster from "../assets/no_poster.png";

export default function WatchedMovie({ movie, onSelectMovie }) {
  const ratingClass = () => {
    if (movie.userRating === 5) return "excellent";
    if (movie.userRating >= 2) return "good";
    return "bad";
  };

  return (
    <>
      <li className={ratingClass()} onClick={() => onSelectMovie(movie)}>
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
            <span className="rating">
              <span className="star">⭐</span>
              <span className="rating-number">{movie.userRating}</span>
            </span>
          </div>
        </div>
      </li>
    </>
  );
}
