import { useEffect } from "react";
import SeriesBubble from "./SeriesBubble";
import "./SeriesBubblesContainer.css";
import imageService from "../../services/image";

const SeriesBubblesContainer = ({ seriesList, setSeries, handleTag, user }) => {
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
          loggedUser={user}
        />
      ))}
    </div>
  );
};

export default SeriesBubblesContainer;
