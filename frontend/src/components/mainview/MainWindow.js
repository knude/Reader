import React, { useState, useEffect, useRef } from "react";
import CreateSeriesForm from "../forms/CreateSeriesForm";
import Header from "../common/Header";
import SearchBar from "./SearchBar";
import MainWindowContent from "./MainWindowContent";
import "./MainWindow.css";
import imageService from "../../services/imageService";

const MainWindow = ({ title, latest }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [series, setSeries] = useState(null);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [searchBar, setSearchBar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const seriesRef = useRef(null);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    imageService.getAll().then((series) => {
      setSeries(series);
      seriesRef.current = series;
      for (let i = 0; i < series.length; i++) {
        const seriesObj = series[i];
        seriesObj.key = i;
      }
    });
  }, []);

  useEffect(() => {
    seriesRef.current = series;
    if (latest && series) {
      const sortedSeries = series.sort((a, b) => {
        if (!a.lastUpdated) {
          return 1;
        }
        if (!b.lastUpdated) {
          return -1;
        }
        return b.lastUpdated - a.lastUpdated;
      });
      setFilteredSeries(sortedSeries);
    } else if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      if (series) {
        setFilteredSeries(series);
      }
    }
  }, [latest, series]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (seriesRef.current) {
      const filteredSeries = seriesRef.current.filter((seriesItem) =>
        seriesItem.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSeries(filteredSeries);
    }
  };

  useEffect(() => {
    if (latest) {
      setSearchBar(null);
    } else {
      setSearchBar(<SearchBar handleSearch={handleSearch} />);
    }
  }, [latest]);

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
      />
      <MainWindowContent
        title={title}
        series={series}
        filteredSeries={filteredSeries}
        setSeries={setSeries}
        searchBar={searchBar}
      />
    </div>
  );
};

export default MainWindow;
