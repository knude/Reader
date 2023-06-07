import "./DisplayWindow.css";
import PageImage from "./PageImage";
import DisplayMargin from "./DisplayMargin";

const DisplayWindow = ({ imageURL, handleIncrement }) => {
  return (
    <div className="display-window">
      <PageImage alt="Page" url={imageURL} />
      <div className="display-margin-container">
        <DisplayMargin
          arrowType="left-arrow"
          handleIncrement={() => handleIncrement(-1)}
        />
        <DisplayMargin
          arrowType="right-arrow"
          handleIncrement={() => handleIncrement(1)}
        />
      </div>
    </div>
  );
};

export default DisplayWindow;
