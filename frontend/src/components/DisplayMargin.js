import "./DisplayMargin.css";

const DisplayMargin = ({ arrowType, handleIncrement }) => {
  return (
    <div className="display-margin" onClick={handleIncrement}>
      <img
        className="arrow"
        src={require("../assets/arrow.png")}
        alt="arrow"
        id={arrowType}
      ></img>
    </div>
  );
};

export default DisplayMargin;
