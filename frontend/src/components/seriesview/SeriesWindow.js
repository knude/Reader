import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SeriesDetails from "./SeriesDetails";
import imageService from "../../services/image";
import LoadingAnimation from "../common/LoadingAnimation";
import "./SeriesWindow.css";

const SeriesWindow = () => {
  const { series } = useParams();
  const [seriesObj, setSeriesObj] = useState(null);

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

  return (
    <div>
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
