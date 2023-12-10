import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [term, setTerm] = React.useState("");

  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  }

  const handleSearch = (event) => {
    // Check if event is a click / enter key pressed
    if (event.type === "click" || event.key === "Enter") {
      event.preventDefault();
      props.onSearch(term);
    }
  }

  return (
    <div className="SearchBar">
      {/* Search input field */}
      <input
        placeholder="Enter a song title, album title, or artist name"
        onChange={handleTermChange} onKeyDown={handleSearch} id="searchText" />
      {/* Button */}
      <button type="button" className="SearchButton" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;