import "./DisplayWindow.css";
import Image from "./Image";
import DisplayMargin from "./DisplayMargin";

const DisplayWindow = ({ imageURL }) => {
  return (
    <div className="display-window">
      <DisplayMargin direction="left-arrow" />
      <Image class="item" alt="Alt" url={imageURL} />
      <DisplayMargin direction="right-arrow" />
    </div>
  );
};

export default DisplayWindow;
