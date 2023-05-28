import React, { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import "./Header.css";
import "./Button.css";

const Header = () => {
  const [isCreateSeriesOpen, setCreateSeriesOpen] = useState(false);

  const handleCreateSeriesClick = () => {
    setCreateSeriesOpen(true);
  };

  const handleCloseCreateSeries = () => {
    setCreateSeriesOpen(false);
  };

  const handleCreateSeries = (seriesName) => {
    // Handle creating the series
    console.log("Creating series:", seriesName);
    // You can perform any necessary logic or API calls here

    // Close the popup
    setCreateSeriesOpen(false);
  };
  const popupContent = [
    <div>Create Series</div>,
    <input type="text" placeholder="Series Name" id="series-name" />,
    <input type="text" placeholder="Series ID" id="series-id" />,
    <input
      type="file"
      name="imageInput"
      accept="image/png, image/gif, image/jpeg"
    />,
    <Button title="Create" onClick={handleCreateSeries} />,
  ];

  return (
    <div className="header">
      <div className="title-container">
        <h1>Reader</h1>
      </div>
      <Button title="Create Series" onClick={handleCreateSeriesClick} />
      {isCreateSeriesOpen && (
        <Popup isOpen={isCreateSeriesOpen} onClose={handleCloseCreateSeries}>
          <div>Create Series</div>
          <div>
            <input type="text" placeholder="Series Name" id="series-name" />
          </div>
          <div>
            <input type="text" placeholder="Series ID" id="series-id" />
          </div>
          <input
            type="file"
            name="imageInput"
            accept="image/png, image/gif, image/jpeg"
          />
          <Button title="Create" onClick={handleCreateSeries} />
        </Popup>
      )}
    </div>
  );
};

export default Header;
