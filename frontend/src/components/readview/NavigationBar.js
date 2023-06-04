import "./NavigationBar.css";

const NavigationBar = ({
  title,
  handleTitleClick,
  selectedChapter,
  chapters,
  handleChapterChange,
}) => {
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-title" onClick={handleTitleClick}>
        {title}
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
    </div>
  );
};

export default NavigationBar;
