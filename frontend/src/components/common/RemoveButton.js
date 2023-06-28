import "./RemoveButton.css";

const RemoveButton = ({ onClick, style }) => {
  return (
    <button className="remove-button" onClick={onClick}>
      ✕
    </button>
  );
};

export default RemoveButton;
