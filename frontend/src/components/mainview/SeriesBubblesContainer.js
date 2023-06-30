import SeriesBubble from "./SeriesBubble";
import { useSelector } from "react-redux";
import "./SeriesBubblesContainer.css";

const SeriesBubblesContainer = ({ handleTag }) => {
  const { shownSeries } = useSelector((state) => state.shownSeries);

  return (
    <div className="series-bubbles-container">
      {shownSeries.map((series) => (
        <SeriesBubble
          {...series}
          seriesList={shownSeries}
          handleTag={handleTag}
        />
      ))}
    </div>
  );
};

export default SeriesBubblesContainer;
