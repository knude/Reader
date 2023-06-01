import { useEffect } from "react";
import SeriesBubble from "./SeriesBubble";
import "./SeriesBubblesContainer.css";
import imageService from "../services/imageService";

const SeriesBubblesContainer = ({ series, setSeries }) => {
  useEffect(() => {
    imageService.getAll().then((series) => {
      setSeries(series);
      for (let i = 0; i < series.length; i++) {
        const seriesObj = series[i];
        seriesObj.key = i;
      }
    });
  }, []);

  // make an implementation so that it doesn't log promise instead the array that's result

  return (
    <div className="series-bubbles-container">
      {series.map((series) => (
        <SeriesBubble {...series} />
      ))}
    </div>
  );
};

export default SeriesBubblesContainer;
