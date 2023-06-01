import ChapterBar from "./ChapterBar";

const ChapterList = ({ chapters }) => {
  console.log("chapterlist", chapters);
  return (
    <div>
      <h2>Chapter List</h2>
      {chapters.map((chapter) => (
        <ChapterBar key={chapter.number} chapter={chapter} />
      ))}
    </div>
  );
};

export default ChapterList;
