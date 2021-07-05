import React, { useEffect, useState } from "react"
import "../style/all.css"
import Header from "./Header"
import SongRow from "./SongRow"
import { useDataLayerValue } from "../DataLayer"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"

import Sidebar from "../components/Sidebar"

function PlayList() {
  const [{ spotify }, dispatch] = useDataLayerValue()
  const [playlist, setPlaylist] = useState(null)
  const [uris, setUris] = useState(null)
  const uriArr = []
  const id = window.location.href.split("/")[4]
  useEffect(() => {
    spotify.getPlaylist(id).then(list => {
      list.tracks.items.forEach(item => uriArr.push(item.track.uri))
      setPlaylist(list)
      setUris(uriArr)
    })
  }, [id])

  const handlePlay = () => {
    console.log(uriArr)
    dispatch({
      type: "SET_PLAYING",
      playingUri: uris,
    })
  }

  return (
    <div className="playlist">
      <Sidebar />
      <div className="body">
        <div className="header">
          <div className="header__left"></div>
          <Header />
        </div>
        <div className="body__info">
          <img src={playlist?.images[0].url} alt="" />
          <div className="body__infoText">
            <h2>{playlist?.name}</h2>
            <p>{playlist?.description}</p>
          </div>
        </div>
        <div>
          <PlayCircleFilledIcon className="playicon" onClick={handlePlay} />
        </div>
        <div className="body__songs">
          {playlist?.tracks.items.map(item => (
            <SongRow key={item.track.uri} track={item.track} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayList
