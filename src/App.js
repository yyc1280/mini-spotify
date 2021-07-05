import Login from "./components/Login"
import { useEffect } from "react"
import { getTokenFromUrl } from "./spotify"
import SpotifyWebApi from "spotify-web-api-js"
import { useDataLayerValue } from "./DataLayer"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Recently from "./pages/Recently"
import PlayList from "./components/PlayList"
import Player from "./components/Player"

const spotify = new SpotifyWebApi()

function App() {
  const [{ token }, dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ""
    const _token = hash.access_token
    // const _token =
    //   "BQCPHoUz1-jWIbvaOyC2KLblsQjphy_sXCflPxPMZg8d34mxZusvXtto0Q_jZd85yQYVQlZ46VVl1C1wGEap52MOqDMJKNutEE7zBoYKdL7qbAhezuJ_Ws6R5PLwFZ7XoLy8PGYSFUyOrLDcnQXYFNyOI9j9-jr_SMczvIGkXqrLOw-Q0GsO-1t9h1Pc_XkLLGn3gWwABQ"

    if (_token) {
      console.log(_token)

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      })

      spotify.setAccessToken(_token)

      spotify.getMe().then(user => {
        dispatch({
          type: "SET_USER",
          user: user,
        })
      })

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
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
