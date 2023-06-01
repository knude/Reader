import React, { useState } from "react";
import Header from "./Header";
import CreateChapterForm from "./CreateChapterForm";

const SeriesWindow = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <Header
        buttonLabel="Upload Chapters"
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
        onClose={handleClosePopup}
        form={<CreateChapterForm onClose={handleClosePopup} />}
      />
    </div>
  );
};

export default SeriesWindow;
