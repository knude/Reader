import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLatest } from "../../reducers/search";
import MainWindowContent from "./MainWindowContent";
import Pagination from "./Pagination";
import "./MainWindow.css";

const MainWindow = ({ title, latest }) => {
  useEffect(() => {
    dispatch(setLatest(latest));
  }, [latest]);

  const dispatch = useDispatch();

  document.title = `${title} | Reader`;

  return (
    <div className="main-window">
      <MainWindowContent title={title} />
      <Pagination />
    </div>
  );
};
export default MainWindow;
