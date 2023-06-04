import React from "react";
import "./ChapterItem.css";

const ChapterItem = ({ series, chapter }) => {
  const title = chapter.title || chapter.title ? `- ${chapter.title}` : "";

  const goToChapter = () => {
    window.location.href = `/${series}/chapter-${chapter.number}/1`;
  };

  return (
    <div className="chapter-item" onClick={goToChapter}>
      <span className="chapter-title">
        Chapter {chapter.number} {title}
      </span>
    </div>
  );
};

export default ChapterItem;
