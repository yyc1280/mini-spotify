export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  playingUri: null,

  // token:
  //   "BQDfTsGYzYKx4kVoLXGNnWaLWtlKYWV0I5y9USjKjC-DEzPn00Bsd1vvIWqnMGMi9KjdTwBMm_yy4dtuUnrjqqiIW8bdDgUCFx-9xI7opXaW0QwXAws_SVFZhgSaAPYSMasT-ZlHkJ0AlTSKQWMK1bWZlWM12PUynfkJ7ELwnycHI026YinLwbT-GRght0ONFsFCqOMJWw",
}

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      }
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      }
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      }
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      }
    case "SET_PLAYING":
      return {
        ...state,
        playingUri: action.playingUri,
      }
    case "SET_SEARCH":
      return {
        ...state,
        search: action.search,
      }
    default:
      return state
  }
}

export default reducer
