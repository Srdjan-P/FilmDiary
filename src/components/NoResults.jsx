export default function NoResults({ message, subMessage }) {
  return (
    <div className="no-results">
      <p>{message}</p>
      <p>{subMessage}</p>
    </div>
  );
}
