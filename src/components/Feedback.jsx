import Button from "./Button";

export default function Feedback({ onAddToWatched }) {
  return (
    <div className="feedback">
      <div className="your-rating">
        <p>Your rating</p>
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <div className="your-comment">
        <p>Your comment (Optional)</p>
        <textarea
          name=""
          id=""
          placeholder="What did you think of this movie?"
        ></textarea>
      </div>
      <div className="float-right">
        <Button onClick={onAddToWatched}>Add</Button>
      </div>
    </div>
  );
}
