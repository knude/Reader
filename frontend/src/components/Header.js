import React, { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import CreateSeriesForm from "./CreateSeriesForm";
import "./Header.css";
import "./Button.css";

const Header = ({ buttonLabel, isPopupOpen, setPopupOpen }) => {
  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmitForm = (seriesData) => {
    console.log("Creating series:", seriesData);
    setPopupOpen(false);
  };

  return (
    <div className="header">
      <div className="title-container">
        <h1>Reader</h1>
      </div>
      <Button title={buttonLabel} onClick={handleButtonClick} />
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <CreateSeriesForm
            onClose={handleClosePopup}
            onCreateSeries={handleSubmitForm}
          />
        </Popup>
      )}
    </div>
  );
};

export default Header;
