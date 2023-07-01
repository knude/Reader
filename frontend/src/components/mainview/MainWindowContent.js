import { useSelector } from "react-redux";
import "./MainWindowContent.css";
import SeriesBubblesContainer from "./SeriesBubblesContainer";
import LoadingAnimation from "../common/LoadingAnimation";
import SearchBar from "./SearchBar";
import MainWindowTitle from "./MainWindowTitle";
import NoSeriesBubble from "./NoSeriesBubble";

const MainWindowContent = ({ title }) => {
  const { series } = useSelector((state) => state.series);
  const { filteredSeries } = useSelector((state) => state.filteredSeries);

  const noSeriesMessage =
    series === [] ? "No series have been created yet." : "No series found.";

  if (series === null) {
    return (
      <div className="main-window-content">
        <MainWindowTitle title={title} />
        <SearchBar />
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="main-window-content">
      <div className="main-window-wrapper">
        <MainWindowTitle title={title} />
        <SearchBar />
        {filteredSeries.length === 0 ? (
          <NoSeriesBubble title={noSeriesMessage} />
        ) : (
          <SeriesBubblesContainer />
        )}
      </div>
    </div>
  );
};

export default MainWindowContent;
