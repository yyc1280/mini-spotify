import Sidebar from "../components/Sidebar"
import { Link } from "react-router-dom"

import "../style/all.css"
import { useDataLayerValue } from "../DataLayer"
import Header from "../components/Header"

function Home() {
  const [{ playlists }] = useDataLayerValue()

  return (
    <div className="home">
      <Sidebar />
      <div className="body">
        <div className="header">
          <div className="header__left"></div>
          <Header />
        </div>

        <h2>你的播放清單</h2>
        <div className="home__list">
          {playlists?.items?.map(item => (
            <Link to={`/playlists/${item.id}`}>
              <div className="home__image">
                <img
                  style={{ width: "200px" }}
                  src={item.images[0].url}
                  alt=""
                />
                <h3>{item.name}</h3>
                <br />
                <div className="text"></div>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
