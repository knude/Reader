import ChapterItem from "./ChapterItem";
import "./ChapterList.css";

const ChapterList = ({ series }) => {
  return (
    <div className="chapter-list">
      <div className="chapter-list-title">Chapter List</div>
      <ul className="chapter-list-items">
        {series.chapters.map((chapter) => (
          <li key={chapter.number} className="chapter-list-item">
            <ChapterItem series={series.abbreviation} chapter={chapter} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
