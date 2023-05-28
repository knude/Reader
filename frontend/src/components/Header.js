import React, { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import CreateSeriesForm from "./CreateSeriesForm";
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

  const handleCreateSeries = (seriesData) => {
    // Handle creating the series
    console.log("Creating series:", seriesData);
    // You can perform any necessary logic or API calls here

    // Close the popup
    setCreateSeriesOpen(false);
  };

  return (
    <div className="header">
      <div className="title-container">
        <h1>Reader</h1>
      </div>
      <Button title="Create Series" onClick={handleCreateSeriesClick} />
      {isCreateSeriesOpen && (
        <Popup isOpen={isCreateSeriesOpen} onClose={handleCloseCreateSeries}>
          <CreateSeriesForm
            onClose={handleCloseCreateSeries}
            onCreateSeries={handleCreateSeries}
          />
        </Popup>
      )}
    </div>
  );
};

export default Header;
