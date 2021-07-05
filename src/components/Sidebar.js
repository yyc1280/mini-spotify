import React from "react"
import SidebarOption from "../components/SidebarOption"
import HomeIcon from "@material-ui/icons/Home"
import SearchIcon from "@material-ui/icons/Search"
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic"
import { useDataLayerValue } from "../DataLayer"
import { Link } from "react-router-dom"
import "../style/all.css"

const Sidebar = () => {
  const [{ playlists }, dispatch] = useDataLayerValue()

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TD8Wy2XCxuh0MF-0YwvJDjt1pNpMkkELdw&usqp=CAU"
        alt=""
      />
      <Link className="link" to="/">
        <SidebarOption Icon={HomeIcon} title="Home" />
      </Link>
      <Link className="link" to="/search">
        <SidebarOption Icon={SearchIcon} title="Search" />
      </Link>
      <Link className="link" to="/recently">
        <SidebarOption Icon={LibraryMusicIcon} title="Recently Played" />
      </Link>

      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />

      {playlists?.items?.map(playlist => (
        <Link
          key={playlist.id}
          className="link"
          to={`/playlists/${playlist.id}`}
        >
          <SidebarOption key={playlist.id} title={playlist.name} />
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
