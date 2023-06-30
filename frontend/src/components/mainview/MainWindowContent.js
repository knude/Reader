import { useSelector } from "react-redux";
import "./MainWindowContent.css";
import SeriesBubblesContainer from "./SeriesBubblesContainer";
import LoadingAnimation from "../common/LoadingAnimation";
import MainWindowTitle from "./MainWindowTitle";
import NoSeriesBubble from "./NoSeriesBubble";

const MainWindowContent = ({ currentSeries, title, searchBar, handleTag }) => {
  const { series } = useSelector((state) => state.series);
  const { filteredSeries } = useSelector((state) => state.filteredSeries);

  const noSeriesMessage =
    series === [] ? "No series have been created yet." : "No series found.";

  if (series === null) {
    return (
      <div className="main-window-content">
        <MainWindowTitle title={title} />
        {searchBar && searchBar}
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="main-window-content">
      <div className="main-window-wrapper">
        <MainWindowTitle title={title} />
        {searchBar && searchBar}
        {filteredSeries.length === 0 ? (
          <NoSeriesBubble title={noSeriesMessage} />
        ) : (
          <SeriesBubblesContainer
            seriesList={currentSeries}
            handleTag={handleTag}
          />
        )}
      </div>
    </div>
  );
};

export default MainWindowContent;
