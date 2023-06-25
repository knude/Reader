import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import CreateSeriesForm from "../forms/CreateSeriesForm";
import Header from "../common/Header";
import SearchBar from "./SearchBar";
import MainWindowContent from "./MainWindowContent";
import Pagination from "./Pagination";
import "./MainWindow.css";
import imageService from "../../services/imageService";

const MainWindow = ({ title, latest }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [series, setSeries] = useState(null);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [searchBar, setSearchBar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [seriesPerPage] = useState(15);

  const seriesRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search"));
  const [tag, setTag] = useState(searchParams.get("tag"));

  document.title = `${title} | Reader`;

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    imageService.getAll().then((series) => {
      const newSeries = series.map((seriesObj, index) => ({
        ...seriesObj,
        key: index,
      }));
      setSeries(newSeries);
      seriesRef.current = newSeries;
    });
  }, []);

  useEffect(() => {
    seriesRef.current = series;
    if (latest && series) {
      const sortedSeries = [...series].sort(
        (a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0)
      );
      setFilteredSeries(sortedSeries);
    } else if (tag) {
      handleTag(tag);
    } else if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setFilteredSeries(series || []);
    }
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [latest, series, searchQuery]);

  const handleTag = (tag) => {
    searchParams.set("tag", tag);
    setTag(tag);
    setSearchQuery("");
    setCurrentPage(1);
    if (seriesRef.current) {
      const filteredSeries = seriesRef.current.filter((seriesItem) =>
        seriesItem.tags.includes(tag)
      );
      setFilteredSeries(filteredSeries);
    }
  };

  const handleSearch = (query) => {
    searchParams.set("search", query);
    setTag(null);
    setSearchQuery(query);
    setCurrentPage(1);
    if (seriesRef.current) {
      const filteredSeries = seriesRef.current.filter((seriesItem) =>
        seriesItem.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSeries(filteredSeries);
    }
  };

  useEffect(() => {
    setSearchBar(
      latest ? null : (
        <SearchBar
          handleSearch={handleSearch}
          searchQuery={searchQuery || ""}
        />
      )
    );
  }, [latest, searchQuery]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastSeries = currentPage * seriesPerPage;
  const indexOfFirstSeries = indexOfLastSeries - seriesPerPage;
  const currentSeries = filteredSeries.slice(
    indexOfFirstSeries,
    indexOfLastSeries
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    if (tag) newSearchParams.set("tag", tag);
    else newSearchParams.delete("tag");

    if (currentPage > 1) newSearchParams.set("page", currentPage.toString());
    else newSearchParams.delete("page");

    if (searchQuery) newSearchParams.set("search", searchQuery);
    else newSearchParams.delete("search");

    const newUrl = newSearchParams.toString()
      ? `?${newSearchParams.toString()}`
      : location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [searchQuery, currentPage, tag, location]);

  return (
    <div className="main-window">
      <Header
        buttonLabel="Create Series"
        isPopupOpen={isPopupOpen}
        setPopupOpen={setPopupOpen}
        onClose={handleClosePopup}
        form={
          <CreateSeriesForm
            series={series}
            setSeries={setSeries}
            onClose={handleClosePopup}
          />
        }
        searchBar={searchBar}
      />
      <MainWindowContent
        title={title}
        series={series}
        filteredSeries={currentSeries}
        setSeries={setSeries}
        searchBar={searchBar}
        searchQuery={searchQuery}
        handleTag={handleTag}
      />
      <Pagination
        seriesPerPage={seriesPerPage}
        totalSeries={filteredSeries.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default MainWindow;
