import React, { useEffect, useState } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import { useDataLayerValue } from "../DataLayer"

const Player = () => {
  const [{ token, playingUri }] = useDataLayerValue()
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [playingUri])
  return (
    <div className="player">
      <SpotifyPlayer
        styles={{
          bgColor: "#181818",
          color: "#b3b3b3",
          trackNameColor: "#fff",
        }}
        token={token}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={
          playingUri
            ? Array.isArray(playingUri)
              ? [...playingUri]
              : [playingUri]
            : []
        }
      />
    </div>
  )
}

export default Player
