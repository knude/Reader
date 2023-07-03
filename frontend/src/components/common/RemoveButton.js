import "./RemoveButton.css";

const RemoveButton = ({ onClick }) => {
  return (
    <button className="remove-button" onClick={onClick}>
      ✕
    </button>
  );
};

export default RemoveButton;
