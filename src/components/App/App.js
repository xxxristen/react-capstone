import React from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
import toastMsg from "../../util/Toast/Toast";
import { ToastContainer } from "react-toastify";

function App() {
  const [searchResults, setSearchResults] = React.useState([]);
  const [playlistName, setPlaylistName] = React.useState(`✎ New playlist`);
  const [playlistTracks, setPlaylistTracks] = React.useState([]);

  // getAccessToken once the component is loaded
  React.useEffect(() => {
    Spotify.getAccessToken();
  }, [])

  function search(term) {
    // Handle empty search
    if (!term) {
      toastMsg("Enter song, album title or artist name to search.", "error");
    }
    // Update the searchResults state with the API response
    Spotify.search(term).then((result) => setSearchResults(result));
  }

  function addTrack(track) {
    // Check if track exist in the playlist
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    // If it doesn't exist, create a new array with existing tracks and add track to it
    if (!existingTrack) {
      setPlaylistTracks([...playlistTracks, track]);
    }
    else {
      toastMsg("Track already exists in playlist.");
    }
  }

  function removeTrack(track) {
    // Filter out the track from the playlist
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  async function savePlaylist() {
    try {
      // Extract track's URI
      const trackURIs = playlistTracks.map((t) => t.uri);
      await Spotify.savePlaylist(playlistName, trackURIs);
      toastMsg(`"${playlistName}" playlist saved successfully.`, "success");
      // Reset the playlist name and tracks after saving
      updatePlaylistName(`✎ New playlist`);
      setPlaylistTracks([]);
    } catch (error) {
      toastMsg('Error saving playlist: ' + error, "error");
    }
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />

        <div className="App-playlist">
          {/* Passing searchResults state to the SearchResults component as userSearchResults */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />

          {/* Passing playlistName & playlistTracks states to the Playlist component */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onTitleChange={updatePlaylistName}
            onFocus={updatePlaylistName}
            onBlur={updatePlaylistName}
            onSave={savePlaylist}
          />
          {/* Show only max 2 toasts */}
          <ToastContainer limit={2} />
        </div>
      </div>
    </div>
  );
}

export default App;