import "./NavigationBar.css";

const NavigationBar = ({
  title,
  titleLocation,
  selectedChapter,
  chapters,
  handleChapterChange,
}) => {
  return (
    <div className="navigation-bar">
      <a className="navigation-bar-title" href={titleLocation}>
        {title}
      </a>
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
