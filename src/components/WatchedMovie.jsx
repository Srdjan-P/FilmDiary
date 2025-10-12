export default function WatchedMovie({ movie }) {
  return (
    <>
      <li>
        <div className="movie-poster">
          <img src={movie.poster} alt="" />
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
