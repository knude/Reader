import { useState, useEffect } from "react";
import "./SearchBar.css";
import Button from "../common/Button";

const SearchBar = ({ handleSearch, searchQuery }) => {
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by title..."
      />
      <Button
        title="Search"
        type="submit"
        style={{
          position: "absolute",
          right: "-1px",
          top: "-1px",
          height: "42px",
        }}
      />
    </form>
  );
};

export default SearchBar;
