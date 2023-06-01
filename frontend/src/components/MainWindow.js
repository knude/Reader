import React, { useState } from "react";
import CreateSeriesForm from "./CreateSeriesForm";
import SeriesBubblesContainer from "./SeriesBubblesContainer";
import Header from "./Header";

const MainWindow = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [series, setSeries] = useState([]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <Header
        buttonLabel="Create Series"
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
        onClose={handleClosePopup}
        form={
          <CreateSeriesForm
            series={series}
            setSeries={setSeries}
            onClose={handleClosePopup}
          />
        }
      />
      <SeriesBubblesContainer series={series} setSeries={setSeries} />
    </div>
  );
};

export default MainWindow;
