import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { setLatest } from "../../reducers/search";
import MainWindowContent from "./MainWindowContent";
import Pagination from "./Pagination";
import "./MainWindow.css";

const MainWindow = ({ title, latest }) => {
  useEffect(() => {
    dispatch(setLatest(latest));
  }, [latest]);

  const dispatch = useDispatch();

  const finalTitle = title ? `${title} | Reader` : "Reader";

  return (
    <div className="main-window">
      <Helmet>
        <title>{finalTitle}</title>
        <meta property="og:title" content={finalTitle} />
      </Helmet>
      <MainWindowContent title={title} />
      <Pagination />
    </div>
  );
};
export default MainWindow;
