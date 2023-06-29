import React from "react";
import "./MainWindowContent.css";
import SeriesBubblesContainer from "./SeriesBubblesContainer";
import LoadingAnimation from "../common/LoadingAnimation";
import MainWindowTitle from "./MainWindowTitle";
import NoSeriesBubble from "./NoSeriesBubble";

const MainWindowContent = ({
  title,
  series,
  filteredSeries,
  setSeries,
  searchBar,
  searchQuery,
  handleTag,
  user,
}) => {
  const noSeriesMessage = searchQuery
    ? "No series found."
    : "No series have been created yet.";

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
            seriesList={filteredSeries}
            setSeries={setSeries}
            handleTag={handleTag}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default MainWindowContent;
