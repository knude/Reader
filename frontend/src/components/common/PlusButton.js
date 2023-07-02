import "./PlusButton.css";

const PlusButton = ({ onClick }) => {
  return (
    <div className="plus-button" onClick={onClick}>
      +
    </div>
  );
};

export default PlusButton;
