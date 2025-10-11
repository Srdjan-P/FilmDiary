export default function WatchedMovie({ movie }) {
  return (
    <>
      <li>
        <img src={movie.poster} alt="" />
        <div className="details">
          <div className="header">
            <span className="title">{movie.title}</span>
            <span>⭐{movie.userRating}</span>
          </div>
          <div className="comment">{movie.comment}</div>
        </div>
      </li>
    </>
  );
}
