import "./MainWindowContent.css";

import SeriesBubblesContainer from "./SeriesBubblesContainer";
import LoadingAnimation from "../common/LoadingAnimation";
import MainWindowTitle from "./MainWindowTitle";

const MainWindowContent = ({
  title,
  series,
  filteredSeries,
  setSeries,
  searchBar,
}) => {
  return (
    <div className="main-window-content">
      <MainWindowTitle title={title} />

      {searchBar && searchBar}
      {series.length > 0 ? (
        <SeriesBubblesContainer
          seriesList={filteredSeries}
          setSeries={setSeries}
        />
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default MainWindowContent;
