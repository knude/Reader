import { useSelector, useDispatch } from "react-redux";
import { toggleHeader } from "../../reducers/header";
import arrow from "../../assets/arrow.png";
import "./NavigationBar.css";

const NavigationBar = ({
  title,
  titleLocation,
  selectedChapter,
  chapters,
  handleChapterChange,
}) => {
  const dispatch = useDispatch();
  const headerHidden = useSelector((state) => state.header.hidden);
  const headerButtonText = headerHidden ? "S" : "H";
  return (
    <div className="navigation-bar">
      {title && (
        <>
          <div className="navigation-bar-title">
            <a
              title="Go back"
              href={titleLocation}
              className="back-button arrow-button"
            >
              <img src={arrow} alt="Back" />
            </a>
            <a title={title} href={titleLocation} className="title">
              <h1>{title}</h1>
            </a>
            <button
              className="button header-button"
              onClick={() => dispatch(toggleHeader())}
            >
              {headerButtonText}
            </button>
          </div>
          <div className="navigation-bar-selector">
            <select value={selectedChapter} onChange={handleChapterChange}>
              {chapters.map((chapter) => (
                <option key={chapter.number} value={chapter.number}>
                  Chapter {chapter.number}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
