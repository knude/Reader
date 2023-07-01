import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFilteredSeries } from "../../reducers/filteredSeries";
import { setCurrentPage, setSearch, setTag } from "../../reducers/search";
import "./SearchBar.css";
import Button from "../common/Button";

const SearchBar = () => {
  const { series } = useSelector((state) => state.series);
  const { latest } = useSelector((state) => state.search);
  const searchQuery = useSelector((state) => state.search.search);
  const { tag, currentPage } = useSelector((state) => state.search);
  const searchParams = new URLSearchParams(window.location.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const search = searchParams.get("search");
    const page = searchParams.get("page");

    if (search) dispatch(setSearch(search));
    if (page) dispatch(setCurrentPage(page));
  }, []);

  const handleSearch = () => {
    if (series) {
      let newSeries = [...series];
      if (latest) {
        newSeries = newSeries.sort((a, b) =>
          (b.lastUpdated || "")?.localeCompare(a.lastUpdated || "")
        );
      } else {
        newSeries = series.filter((seriesItem) =>
          seriesItem.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      dispatch(setFilteredSeries(newSeries));
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSubmit = (e) => {
    dispatch(setSearch(e.target.value));
    e.preventDefault();
    updateURL();
    handleSearch();
  };

  const updateURL = () => {
    dispatch(setSearch(searchQuery));
    dispatch(setTag(""));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(window.location.search);

    if (tag) newSearchParams.set("tag", tag);
    else newSearchParams.delete("tag");

    if (currentPage > 1) newSearchParams.set("page", currentPage);
    else newSearchParams.delete("page");

    if (searchQuery) newSearchParams.set("search", searchQuery);
    else newSearchParams.delete("search");

    const newUrl = newSearchParams.toString()
      ? `?${newSearchParams.toString()}`
      : location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [currentPage, tag, location]);

  if (latest) return null;

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
