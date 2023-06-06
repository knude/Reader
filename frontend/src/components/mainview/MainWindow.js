import React, { useState, useEffect } from "react";
import CreateSeriesForm from "../forms/CreateSeriesForm";
import Header from "../common/Header";
import SearchBar from "./SearchBar";
import MainWindowContent from "./MainWindowContent";
import "./MainWindow.css";
import imageService from "../../services/imageService";

const MainWindow = ({ title, latest }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [searchBar, setSearchBar] = useState(null);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (latest) {
      setSearchBar(null);
    } else {
      setSearchBar(<SearchBar handleSearch={handleSearch} />);
    }
  }, [latest]);

  const handleSearch = (query) => {
    const filteredSeries = series.filter((series) =>
      series.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSeries(filteredSeries);
  };

  useEffect(() => {
    imageService.getAll().then((series) => {
      setSeries(series);
      for (let i = 0; i < series.length; i++) {
        const seriesObj = series[i];
        seriesObj.key = i;
      }
    });
  }, []);

  useEffect(() => {
    if (latest) {
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
    } else {
      setFilteredSeries(series);
    }
  }, [latest, series]);

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
            setSeries={setFilteredSeries}
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
