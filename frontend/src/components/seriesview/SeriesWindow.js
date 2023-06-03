import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import ChapterList from "./ChapterList";
import CreateChapterForm from "../forms/CreateChapterForm";
import imageService from "../../services/imageService";
import LoadingAnimation from "../common/LoadingAnimation";

const SeriesWindow = () => {
  const { series } = useParams();
  const [seriesObj, setSeriesObj] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    imageService.getSeries(series).then((seriesObj) => {
      setSeriesObj(seriesObj);
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
          <div>{seriesObj.name}</div>
          <div>
            <ChapterList chapters={seriesObj.chapters} />
          </div>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default SeriesWindow;
