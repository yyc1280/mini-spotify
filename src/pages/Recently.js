import React from "react"
import Sidebar from "../components/Sidebar"
import RecentlyPlayed from "../components/RecentlyPlayed"
import "../style/all.css"
import Header from "../components/Header"

const Recently = () => {
  return (
    <div className="recently">
      <Sidebar />
      <div className="body">
        <div className="header">
          <div className="header__left"></div>
          <Header />
        </div>

        <h2 style={{ marginBottom: "20px" }}>最近播放</h2>
        <RecentlyPlayed />
      </div>
    </div>
  )
}

export default Recently
