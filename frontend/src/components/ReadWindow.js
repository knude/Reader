import "./ReadWindow.css";

import NavigationBar from "./NavigationBar";
import DisplayWindow from "./DisplayWindow";

const ReadWindow = () => {
  return (
    <div className="read-window">
      <NavigationBar />
      <DisplayWindow />
    </div>
  );
};

export default ReadWindow;
