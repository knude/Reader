import React, { useState, useEffect } from "react";
import CreateSeriesForm from "../forms/CreateSeriesForm";
import SeriesBubblesContainer from "./SeriesBubblesContainer";
import LoadingAnimation from "../common/LoadingAnimation";
import Header from "../common/Header";
import SearchBar from "./SearchBar";
import "./MainWindow.css";
import imageService from "../../services/imageService";

const MainWindow = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [series, setSeries] = useState([]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  useEffect(() => {
    imageService.getAll().then((series) => {
      setSeries(series);
      for (let i = 0; i < series.length; i++) {
        const seriesObj = series[i];
        seriesObj.key = i;
      }
    });
  }, []);

  return (
    <div className="main-window">
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
      <div className="main-window-content">
        <div className="main-window-title">Browse</div>
        <SearchBar />
        {series.length > 0 ? (
          <SeriesBubblesContainer series={series} setSeries={setSeries} />
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
};

export default MainWindow;
