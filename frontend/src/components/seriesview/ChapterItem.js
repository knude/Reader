import React, { useState } from "react";
import "./ChapterItem.css";
import Popup from "../common/Popup";
import Button from "../common/Button";
import RemoveButton from "../common/RemoveButton";
import imageService from "../../services/imageService";

const ChapterItem = ({ series, chapter, setSeries }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const title = chapter.title || chapter.title ? `- ${chapter.title}` : "";

  const handleRemoveChapter = () => {
    setIsPopupOpen(true);
  };

  const confirmRemoveChapter = () => {
    console.log("Removing chapter:", chapter.number);

    const newChapters = series.chapters.filter(
      (c) => c.number !== chapter.number
    );

    imageService.removeChapter(series.abbreviation, chapter.number);
    setSeries({ ...series, chapters: newChapters });

    setIsPopupOpen(false);
  };

  const cancelRemoveChapter = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="chapter-item-wrapper">
      <div className="remove-button-parent">
        <RemoveButton onClick={handleRemoveChapter} />
        <div className="chapter-item">
          <a href={`/${series.abbreviation}/${chapter.number}/1`}>
            <span className="chapter-title">
              Chapter {chapter.number} {title}
            </span>
          </a>
        </div>
      </div>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={cancelRemoveChapter}>
          <span>Remove Chapter {chapter.number}?</span>
          <div className="popup-remove-button-container">
            <Button title="Remove" onClick={confirmRemoveChapter} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ChapterItem;
