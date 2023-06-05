import React from "react";
import "./ChapterItem.css";

const ChapterItem = ({ series, chapter }) => {
  const title = chapter.title || chapter.title ? `- ${chapter.title}` : "";

  return (
    <a className="chapter-item" href={`/${series}/chapter-${chapter.number}/1`}>
      <span className="chapter-title">
        Chapter {chapter.number} {title}
      </span>
    </a>
  );
};

export default ChapterItem;
