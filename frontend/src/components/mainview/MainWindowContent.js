import "./MainWindowContent.css";

import SeriesBubblesContainer from "./SeriesBubblesContainer";
import LoadingAnimation from "../common/LoadingAnimation";

const MainWindowContent = ({
  title,
  series,
  filteredSeries,
  setSeries,
  searchBar,
}) => {
  const titleWords = title.split(" ");
  return (
    <div className="main-window-content">
      <div className="main-window-title">
        {titleWords.map((word, index) => (
          <span key={index}>
            <span className="first-letter">{word.charAt(0)}</span>
            {word.slice(1)}{" "}
          </span>
        ))}
      </div>

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
