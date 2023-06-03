import { useState } from "react";

import "./DisplayWindow.css";
import Image from "./Image";
import DisplayMargin from "./DisplayMargin";

const DisplayWindow = ({ imageURL, handleIncrement }) => {
  return (
    <div className="display-window">
      <DisplayMargin
        arrowType="left-arrow"
        handleIncrement={() => handleIncrement(-1)}
      />
      <Image
        class="item"
        alt="Alt"
        url={imageURL}
        handleIncrement={handleIncrement}
      />
      <DisplayMargin
        arrowType="right-arrow"
        handleIncrement={() => handleIncrement(1)}
      />
    </div>
  );
};

export default DisplayWindow;
