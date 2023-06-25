import { useEffect } from "react";
import SeriesBubble from "./SeriesBubble";
import "./SeriesBubblesContainer.css";
import imageService from "../../services/imageService";

const SeriesBubblesContainer = ({ seriesList, setSeries, handleTag }) => {
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
    <div className="series-bubbles-container">
      {seriesList.map((series) => (
        <SeriesBubble
          {...series}
          seriesList={seriesList}
          setSeries={setSeries}
          handleTag={handleTag}
        />
      ))}
    </div>
  );
};

export default SeriesBubblesContainer;
