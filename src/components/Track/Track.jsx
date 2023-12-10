import React from "react";
import "./Track.css";

function Track(props) {
  
  function renderAction() {
    // If toRemove is true, displays "-" button
    if (props.toRemove) {
      return (
        <button className="Track-action" onClick={RemoveTrack}>
          -
        </button>
      );
      // If toRemove is false, displays "-" button
    } else {
      return (
        <button className="Track-action" onClick={AddTrack}>
          +
        </button>
      );
    }
  }

  function AddTrack() {
    props.onAdd(props.track);
  }

  function RemoveTrack() {
    props.onRemove(props.track);
  }
  return (
    <div className="Track">
      <div className="Track-information">
        {/* Show track's name */}
        <h3>{props.track.name}</h3>
        <p>
          {/* Show artist and link to artist's page in Spotify */}
          Artist: <span><a href={`https://open.spotify.com/artist/${props.track.artistid}`} target="artist" rel="noreferrer">{props.track.artist}</a></span>
          &nbsp;|&nbsp;
          {/* Show album name and link to album's page in Spotify */}
          Album: <span><a href={`https://open.spotify.com/album/${props.track.albumid}`} target="album" rel="noreferrer">{props.track.album}</a></span>
        </p>
      </div>
      {/* Display the "-" or "+" button */}
      {renderAction()}
    </div>
  );
}

export default Track;