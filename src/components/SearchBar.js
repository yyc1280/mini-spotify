import React, { useEffect, useState } from "react"
import SearchIcon from "@material-ui/icons/Search"
import { useDataLayerValue } from "../DataLayer"

import "../style/all.css"

function SearchBar() {
  const [{ spotify }, dispatch] = useDataLayerValue()

  const [search, setSearch] = useState("")
  const [dbSearch, setDbsearch] = useState(search)

  const hendleSearch = e => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    dispatch({
      type: "SET_SEARCH",
      search: null,
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDbsearch(search)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    if (dbSearch) {
      console.log(dbSearch)
      spotify
        .searchTracks(dbSearch)
        .then(res => {
          dispatch({
            type: "SET_SEARCH",
            search: res.tracks.items,
          })
        })
        .catch(err => console.log(err))
    }
  }, [dbSearch])

  return (
    <div className="searchBar">
      <SearchIcon />
      <input
        onChange={hendleSearch}
        value={search}
        placeholder="Search for Songs "
        type="text"
      />
    </div>
  )
}

export default SearchBar
