import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {

  function handleTitleChange({ target }) {
    props.onTitleChange(target.value);
  }
  // When focus on the playlist title field
  const handleFocus = ({ target }) => {
    const currentValue = target.value;
    // If value matches the default value defined in useState, clear the value
    if (currentValue === `✎ New playlist`) {
      props.onFocus("");
    }
  }
  // When user leaves the playlist title field
  const handleBlur = () => {
    // If user did not enter a playlist title, set it to default name
    if (!props.playlistName) {
      props.onBlur(`✎ New playlist`);
    }
  }

  return (
    <div className="Playlist">
      <input type="text" value={props.playlistName} onFocus={handleFocus} onBlur={handleBlur} onChange={handleTitleChange} id="playlistTitle" />
      {/* Check if tracklist is empty */}
      {/* Show message when tracklist is empty */}
      {props.playlistTracks.length === 0 ?
        (<p>😪 Borrrriiing... Add songs to start your playlist now!</p>)
        :
        (
          <>
            <Tracklist
              // Passing playlistTracks props from playlist component to Tracktlist component
              userSearchResults={props.playlistTracks}
              onRemove={props.onRemove}
              toRemove={true}
            />
            <button type="button" className="Playlist-save" onClick={props.onSave} >
              Save to Spotify
            </button>
          </>
        )}

    </div>
  );
}

export default Playlist;