import React, { useEffect, useState } from "react"
import { useDataLayerValue } from "../DataLayer"
import SongRow from "./SongRow"
import "../style/all.css"

function RecentlyPlayed() {
  const [{ spotify }, dispatch] = useDataLayerValue()
  const [played, setPlayed] = useState([])

  useEffect(() => {
    spotify
      .getMyRecentlyPlayedTracks()
      .then(res => {
        const filteredTracks = res.items.filter((item, i) => {
          if (i === 0) return true
          return item.track.id !== res.items[i - 1].track.id
        })

        setPlayed(filteredTracks)
      })
      .catch(err => {
        window.location.reload()
      })
  }, [])

  return (
    <div className="recentlyPlayed">
      {played &&
        played?.map(song => {
          return <SongRow key={played.indexOf(song)} track={song.track} />
        })}
    </div>
  )
}

export default RecentlyPlayed
