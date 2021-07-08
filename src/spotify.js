const authEndpotin = "https://accounts.spotify.com/authorize"
const redirectUri = process.env.REACT_APP_REDIRECTURI
const clientId = "0ce51b5f6ec742b5af56f0470ebc49cb"
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-top-read",
  "playlist-read-private",
]

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((init, item) => {
      let parts = item.split("=")
      init[parts[0]] = decodeURIComponent([parts[1]])
      return init
    }, {})
}

export const loginUrl = `${authEndpotin}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`
