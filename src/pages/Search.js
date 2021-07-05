import React, { useEffect, useState } from "react"

import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import Header from "../components/Header"
import SongRow from "../components/SongRow"
import { useDataLayerValue } from "../DataLayer"

import "../style/all.css"

function Search() {
  const [{ search }, dispatch] = useDataLayerValue()

  return (
    <div className="search">
      <Sidebar />
      <div className="body">
        <div className="header">
          <div className="header__left">
            <SearchBar />
          </div>

          <Header />
        </div>
        <div className="search__result">
          {search && search.map(track => <SongRow track={track} />)}
        </div>
      </div>
    </div>
  )
}

export default Search
