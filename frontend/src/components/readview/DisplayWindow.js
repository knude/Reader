import { useEffect } from "react";
import "./DisplayWindow.css";
import PageImage from "./PageImage";
import DisplayMargin from "./DisplayMargin";

const DisplayWindow = ({ imageURL, handleIncrement }) => {
  const onDisplayWindowClick = (event) => {
    const displayWindow = event.currentTarget;
    const displayWindowRect = displayWindow.getBoundingClientRect();
    const xCoordinate = event.clientX - displayWindowRect.left;
    const xCoordinateCentered =
      (xCoordinate - displayWindowRect.width / 2) /
      (displayWindowRect.width / 2);

    if (xCoordinateCentered > -0.1) {
      handleIncrement(1);
    } else {
      handleIncrement(-1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      handleIncrement(-1);
    } else if (event.key === "ArrowRight") {
      handleIncrement(1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleIncrement]);

  return (
    <div className="display-window" onClick={onDisplayWindowClick}>
      <PageImage alt="Page" url={imageURL} />
      <div className="display-margin-container">
        <DisplayMargin arrowType="left-arrow" />
        <DisplayMargin arrowType="right-arrow" />
      </div>
    </div>
  );
};

export default DisplayWindow;
