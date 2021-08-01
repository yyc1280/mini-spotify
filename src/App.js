import Login from "./components/Login"
import { useEffect } from "react"
import { getTokenFromUrl } from "./spotify"
import SpotifyWebApi from "spotify-web-api-js"
import { useDataLayerValue } from "./DataLayer"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Recently from "./pages/Recently"
import Saved from "./pages/Saved"
import PlayList from "./components/PlayList"
import Player from "./components/Player"
import { SaveAltRounded } from "@material-ui/icons"

const spotify = new SpotifyWebApi()

function App() {
  const [{ token }, dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ""

    const { access_token, expires_in } = hash
    const local = localStorage.getItem("token")

    let _token
    const expireTime = Date.now() / 1000 + parseInt(expires_in)

    if (!local) {
      if (access_token && expires_in) {
        _token = access_token
        localStorage.setItem(
          "token",
          JSON.stringify({
            _token,
            expireTime,
          })
        )
      }
    } else {
      if (JSON.parse(local).expireTime < Date.now() / 1000) {
        //token expired
        localStorage.clear()
        window.location.reload()
      }
      _token = JSON.parse(local)._token
    }

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      })

      spotify.setAccessToken(_token)

      spotify
        .getMe()
        .then(user => {
          dispatch({
            type: "SET_USER",
            user: user,
          })
        })
        .catch(err => {
          console.log(err)
        })

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        })
      })

      spotify.getMySavedTracks().then(tracks => {
        dispatch({
          type: "SET_SAVEDTRACKS",
          savedTracks: tracks.items,
        })
      })
    }
  }, [])

  return (
    <div className="app">
      {token ? (
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />
              <Route path="/playlists/:id" exact component={PlayList} />
              <Route path="/recently" exact component={Recently} />
              <Route path="/saved" exact component={Saved} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </BrowserRouter>
        </div>
      ) : (
        <Login />
      )}
      {token && <Player />}
    </div>
  )
}

export default App
