import "./PlusButton.css";

const PlusButton = ({ handleClick }) => {
  return (
    <div className="plus-button" onClick={handleClick}>
      +
    </div>
  );
};

export default PlusButton;
