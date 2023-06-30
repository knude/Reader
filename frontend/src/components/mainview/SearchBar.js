import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredSeries } from "../../reducers/filteredSeries";
import { setSearch } from "../../reducers/search";
import "./SearchBar.css";
import Button from "../common/Button";

const SearchBar = () => {
  const { series } = useSelector((state) => state.series);
  const searchQuery = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (series) {
      const filteredSeries = series.filter((seriesItem) =>
        seriesItem.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch(setFilteredSeries(filteredSeries));
    }
  };

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateURL();
    handleSearch();
  };

  const updateURL = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set("search", searchQuery);
    const queryString = searchParams.toString();
    const newUrl = queryString
      ? `${location.pathname}?${queryString}`
      : location.pathname;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("search") || "";
    dispatch(setSearch(query));
    setTimeout(() => {
      handleSearch();
    }, 0);
  }, []);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search by title..."
      />
      <Button title="Search" type="submit" />
    </form>
  );
};

export default SearchBar;
