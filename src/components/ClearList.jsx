import Button from "./Button";

export default function ClearList({
  children,
  setConfirmation,
  onConfirmation,
}) {
  return (
    <div className="clear-list">
      <div className="clear-list-window">
        <div className="confirmation-title">Confirmation window</div>
        <div className="confirmation-message">
          Are you sure you want to clear {children}
        </div>
        <div className="buttons">
          <Button onClick={() => setConfirmation(false)}>Cancel</Button>
          <Button className="delete-btn" onClick={onConfirmation}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
