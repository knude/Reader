import { useState } from "react";
import "./SearchBar.css";
import Button from "../common/Button";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

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
        placeholder="Search..."
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
