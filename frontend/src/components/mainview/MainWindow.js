import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredSeries } from "../../reducers/filteredSeries";
import { setTag, setCurrentPage } from "../../reducers/search";
import SearchBar from "./SearchBar";
import MainWindowContent from "./MainWindowContent";
import Pagination from "./Pagination";
import "./MainWindow.css";

const MainWindow = ({ title, latest }) => {
  const { series } = useSelector((state) => state.series);
  const { search, tag, currentPage } = useSelector((state) => state.search);
  const [searchBar, setSearchBar] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  document.title = `${title} | Reader`;

  useEffect(() => {
    if (latest && series) {
      const sortedSeries = [...series].sort(
        (a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0)
      );
      dispatch(setFilteredSeries(sortedSeries));
    } else if (tag) {
      handleTag(tag);
    }
    dispatch(setCurrentPage(Number(searchParams.get("page") || 1)));
  }, [latest, series]);

  const handleTag = (tag) => {
    searchParams.set("tag", tag);
    dispatch(setTag(tag));
    dispatch(setCurrentPage(1));
    if (series) {
      const filteredSeries = series.filter((seriesItem) =>
        seriesItem.tags.includes(tag)
      );
      dispatch(setFilteredSeries(filteredSeries));
    }
  };

  useEffect(() => {
    setSearchBar(latest ? null : <SearchBar />);
  }, [latest]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    if (tag) newSearchParams.set("tag", tag);
    else newSearchParams.delete("tag");

    if (currentPage > 1) newSearchParams.set("page", currentPage.toString());
    else newSearchParams.delete("page");

    const newUrl = newSearchParams.toString()
      ? `?${newSearchParams.toString()}`
      : location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [currentPage, tag, location]);

  return (
    <div className="main-window">
      <MainWindowContent
        title={title}
        searchBar={searchBar}
        handleTag={handleTag}
      />
      <Pagination />
    </div>
  );
};
export default MainWindow;
