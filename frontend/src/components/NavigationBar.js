import { useState } from "react";
import "./NavigationBar.css";
import FileUploader from "./FileUploader";

const NavigationBar = () => {
  return (
    <>
      <div className="navigation-bar">
        <h1>Reader</h1>
        <FileUploader />
      </div>
    </>
  );
};

export default NavigationBar;
