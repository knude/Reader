import React, { useState } from "react";
import SeriesBubblesContainer from "./SeriesBubblesContainer";
import Header from "./Header";

const MainWindow = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div>
      <Header
        buttonLabel="Create Series"
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
      />
      <SeriesBubblesContainer />
    </div>
  );
};

export default MainWindow;
