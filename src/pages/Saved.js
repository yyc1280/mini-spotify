import React from "react"
import Sidebar from "../components/Sidebar"
import SongRow from "../components/SongRow"
import "../style/all.css"
import Header from "../components/Header"
import { useDataLayerValue } from "../DataLayer"

const Saved = () => {
  const [{ savedTracks }] = useDataLayerValue()

  return (
    <div className="recently">
      <Sidebar />
      <div className="body">
        <div className="header">
          <div className="header__left"></div>
          <Header />
        </div>

        <h2 style={{ marginBottom: "20px" }}>你的最愛</h2>
        <div className="recentlyPlayed">
          {savedTracks?.map(song => {
            return <SongRow key={song.track.id} track={song.track} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Saved
