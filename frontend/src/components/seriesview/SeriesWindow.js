import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import SeriesDetails from "./SeriesDetails";
import CreateChapterForm from "../forms/CreateChapterForm";
import imageService from "../../services/image";
import LoadingAnimation from "../common/LoadingAnimation";
import "./SeriesWindow.css";

const SeriesWindow = () => {
  const { series } = useParams();
  const [seriesObj, setSeriesObj] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  document.title = seriesObj ? `${seriesObj.name} | Reader` : "Reader";

  useEffect(() => {
    imageService.getSeries(series).then((seriesObj) => {
      const newSeriesObj = seriesObj;
      newSeriesObj.chapters = newSeriesObj.chapters.sort(
        (a, b) => b.number - a.number
      );
      setSeriesObj(newSeriesObj);
    });
  }, []);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div>
      <Header
        buttonLabel="Upload A Chapter"
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
        onClose={handleClosePopup}
        form={
          <CreateChapterForm series={seriesObj} onClose={handleClosePopup} />
        }
      />
      {seriesObj ? (
        <>
          <SeriesDetails series={seriesObj} setSeries={setSeriesObj} />
        </>
      ) : (
        <div className="series-window-loading">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default SeriesWindow;
