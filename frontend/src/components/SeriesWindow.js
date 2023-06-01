import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ChapterList from "./ChapterList";
import CreateChapterForm from "./CreateChapterForm";
import imageService from "../services/imageService";

const SeriesWindow = () => {
  const { series } = useParams();
  const [seriesObj, setSeriesObj] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    imageService.getSeries(series).then((seriesObj) => {
      setSeriesObj(seriesObj);
    });
  }, []);
  console.log(seriesObj);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <Header
        buttonLabel="Upload Chapters"
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
        onClose={handleClosePopup}
        form={<CreateChapterForm onClose={handleClosePopup} />}
      />
      {seriesObj ? (
        <>
          <div>{seriesObj.name}</div>
          <div>
            <ChapterList chapters={seriesObj.chapters} />
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default SeriesWindow;
