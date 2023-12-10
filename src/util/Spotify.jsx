let accessToken;
const clientID = "017a521c06c84f35b385367f0cce7287";
const redirectUrl = "http://localhost:3000";

const Spotify = {

  getAccessToken() {
    // Check if accesstoken is present
    if (accessToken) return accessToken;

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenInURL && expiryTime) {
      // Extract token value and expiration time
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      // Schedule access token expiration
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }
    // If access token not found, redirect to Spotify login page
    else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
      window.location = redirect;
    }
  },

  search(term) {
    // Handle if no search term is passed
    if (!term) {
      // Resolves with empty array
      return Promise.resolve([]);
    }
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response with track data
        if (!data || !data.tracks || !data.tracks.items) {
          console.log("Fetching of data failed.");
          return [];
        }
        return data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          artistid: track.artists[0].id,
          album: track.album.name,
          albumid: track.album.id,
          uri: track.uri,
        }));
      });
  },

  savePlaylist(name, trackUris) {
    // Handle if name or track URI is falsy
    if (!name || !trackUris) return;
    const accessToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${accessToken}` };
    let userId;
    // Making a request to endpoint for a request that returns the user’s Spotify username
    return fetch('https://api.spotify.com/v1/me', {
      method: "GET",
      headers: header
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetching of user data failed - ${response.statusText}`);
        }
        return response.json();
      })
      .then((userdata) => {
        userId = userdata.id;
        let playlistId;
        // Making a POST request to endpoint to create new playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Saving of playlist to user's account failed - ${response.statusText}`);
            }
            return response.json();
          })
          .then((playlistdata) => {
            playlistId = playlistdata.id;
            // Making a POST request to the endpoint to add tracks to playlist
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          })
          .then(() => {
            console.log(`Playlist "${name}" id: ${playlistId} saved to account successfully.`);
          })
      });
  },

};
export default Spotify;