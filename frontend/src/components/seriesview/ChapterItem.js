import React, { useState } from "react";
import "./ChapterItem.css";
import Popup from "../common/Popup";
import Button from "../common/Button";
import RemoveButton from "../common/RemoveButton";
import seriesService from "../../services/series";

const ChapterItem = ({ series, chapter, removeChapter, user }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const title = chapter.title || chapter.title ? `- ${chapter.title}` : "";
  const isPermitted = (user && user.id === series.user) || (user && user.admin);

  const handleRemoveChapter = () => {
    setIsPopupOpen(true);
  };

  const confirmRemoveChapter = () => {
    console.log("Removing chapter:", chapter.number);
    seriesService.removeChapter(series.abbreviation, chapter.number);
    removeChapter(chapter.number);
    setIsPopupOpen(false);
  };

  const cancelRemoveChapter = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="remove-button-parent">
      <div className="chapter-item-wrapper">
        <a href={`/${series.abbreviation}/chapter-${chapter.number}/1`}>
          <div className="chapter-item">
            <span className="chapter-title">
              Chapter {chapter.number} {title}
            </span>
          </div>
        </a>
        {isPermitted && <RemoveButton onClick={handleRemoveChapter} />}
        {isPopupOpen && (
          <Popup isOpen={isPopupOpen} onClose={cancelRemoveChapter}>
            <span>Remove Chapter {chapter.number}?</span>
            <div className="popup-remove-button-container">
              <Button title="Remove" onClick={confirmRemoveChapter} />
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default ChapterItem;
