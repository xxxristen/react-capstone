import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function Tracklist(props) {

  return (
    <div className="Tracklist">
      {/* Passing userSearchResults from SearchResults component */}
      {/* Rendering each track in the userSearchResults props */}
      {props.userSearchResults.map((track) => (
        <Track
          track={track}
          key={track.id}
          onAdd={props.onAdd}
          toRemove={props.toRemove}
          onRemove={props.onRemove}
        />
      ))}
    </div>
  );
}

export default Tracklist;