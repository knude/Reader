import "./DisplayMargin.css";

const DisplayMargin = ({ direction, onClick }) => {
  return (
    <div className="display-margin" onClick={onClick}>
      <img
        id={direction}
        src={require("../assets/arrow.png")}
        alt="arrow"
      ></img>
    </div>
  );
};

export default DisplayMargin;
