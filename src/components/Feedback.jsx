import Button from "./Button";
import StarRating from "./StarRating";

export default function Feedback({
  onAddToWatched,
  setUserRating,
  comment,
  setComment,
  userRating,
}) {
  return (
    <div className="feedback-wrapper">
      <div className="feedback">
        <div className="your-rating">
          <p>Your Rating</p>
          <StarRating
            maxRating={5}
            size={40}
            onSetRating={setUserRating}
            defaultRating={0}
            className="star-rating"
          />
        </div>
        <div className="your-comment">
          <p>Your Comment (Optional)</p>
          <textarea
            name=""
            id=""
            placeholder="What did you think of this movie?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div>
        {userRating > 0 ? (
          <Button className="add-btn" onClick={onAddToWatched}>
            Add
          </Button>
        ) : null}
      </div>
    </div>
  );
}
