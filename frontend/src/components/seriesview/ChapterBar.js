import React from "react";

const ChapterBar = ({ chapter }) => {
  const title = chapter.title ? chapter.title : `Chapter ${chapter.number}`;
  return (
    <div>
      <h3>
        {chapter.number} - {title}
      </h3>
      {/* Add any other content or functionality for the chapter bar */}
    </div>
  );
};

export default ChapterBar;
