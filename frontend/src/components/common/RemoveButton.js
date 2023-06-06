import "./RemoveButton.css";

const RemoveButton = ({ onClick, style }) => {
  return (
    <button className="remove-button" onClick={onClick} style={style}>
      ✕
    </button>
  );
};

export default RemoveButton;
