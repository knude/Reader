import { useDispatch, useSelector } from "react-redux";
import { removeChapter } from "../../reducers/seriesViewSeries";
import ChapterItem from "./ChapterItem";
import "./ChapterList.css";

const ChapterList = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const series = useSelector((state) => state.seriesViewSeries.series);

  const handleRemoveChapter = (chapter) => {
    dispatch(removeChapter(chapter));
  };

  const sortedChapters = [...series.chapters];
  sortedChapters.sort((a, b) => b.number - a.number);

  return (
    <div className="chapter-list">
      <div className="chapter-list-title">Chapter List</div>
      <ul className="chapter-list-items">
        {sortedChapters.map((chapter) => (
          <li key={chapter.number} className="chapter-list-item">
            <ChapterItem
              series={series}
              chapter={chapter}
              removeChapter={handleRemoveChapter}
              user={user}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
