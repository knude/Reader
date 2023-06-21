import React from "react";
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
      <MainWindowTitle title={title} />
      {searchBar && searchBar}
      {filteredSeries.length === 0 ? (
        <p>No series have been created yet.</p>
      ) : (
        <SeriesBubblesContainer
          seriesList={filteredSeries}
          setSeries={setSeries}
        />
      )}
    </div>
  );
};

export default MainWindowContent;
