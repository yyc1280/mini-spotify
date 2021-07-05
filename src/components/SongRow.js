import React from "react"
import "../style/all.css"
import { useDataLayerValue } from "../DataLayer"

function SongRow({ track }) {
  const [store, dispatch] = useDataLayerValue()

  const hangleSelect = () => {
    dispatch({
      type: "SET_PLAYING",
      playingUri: track.uri,
    })
  }

  return (
    <div onClick={hangleSelect} className="songRow">
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map(artist => artist.name).join(", ")}{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  )
}

export default SongRow
