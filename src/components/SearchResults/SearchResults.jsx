import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
  return (
    <div className="SearchResults">
      <h3 className="searchHeader">Search results</h3>
      {/* Check if there's any returns in the userSearchResults array */}
      {props.userSearchResults.length === 0 ?
        (<p>Start a search for songs to add to your playlist...</p>)
        : (
          <Tracklist
            // Passing from SearchResults component
            userSearchResults={props.userSearchResults}
            toRemove={false}
            onAdd={props.onAdd}
          />
        )}
    </div>
  );
}

export default SearchResults;