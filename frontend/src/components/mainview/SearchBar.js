import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setSearch, setTag } from "../../reducers/search";
import { setFilteredSeries } from "../../reducers/filteredSeries";
import "./SearchBar.css";
import Button from "../common/Button";

const SearchBar = () => {
  const { series } = useSelector((state) => state.series);
  const { latest, tag, currentPage, search } = useSelector(
    (state) => state.search
  );
  const [tempQuery, setTempQuery] = useState(search);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get("search") || "";
    const urlTag = params.get("tag") || "";
    const urlPage = Number(params.get("page")) || 1;

    dispatch(setSearch(urlSearch));
    dispatch(setTag(urlTag));
    dispatch(setCurrentPage(urlPage));

    setTempQuery(urlSearch);
  }, [dispatch]);

  useEffect(() => {
    if (series) {
      let newSeries = [...series];
      if (latest) {
        newSeries.sort((a, b) =>
          (b.lastUpdated || "").localeCompare(a.lastUpdated || "")
        );
      }
      if (search) {
        newSeries = newSeries.filter((seriesItem) =>
          seriesItem.name.toLowerCase().includes(tempQuery.toLowerCase())
        );
      }
      if (tag) {
        newSeries = newSeries.filter((seriesItem) =>
          seriesItem.tags.includes(tag)
        );
      }
      dispatch(setFilteredSeries(newSeries));
      updateSearchParams();
    }
  }, [dispatch, series, search, latest, tag, currentPage]);

  const handleChange = (e) => {
    setTempQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    dispatch(setSearch(tempQuery));
    dispatch(setTag(""));
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();

    if (tag) params.set("tag", tag);
    if (tempQuery) params.set("search", tempQuery);
    if (currentPage > 1) params.set("page", currentPage);

    const newParams = params.toString();
    const newUrl = `${window.location.pathname}${
      newParams ? "?" : ""
    }${newParams}`;
    window.history.replaceState({}, "", newUrl);
  };

  if (latest) return null;

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={tempQuery}
        onChange={handleChange}
        placeholder="Search by title..."
      />
      <Button title="Search" type="submit" />
    </form>
  );
};

export default SearchBar;
