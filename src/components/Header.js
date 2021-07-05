import React from "react";
import "../style/all.css";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../DataLayer";

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();

  return (
    <div className="info">
      <Avatar src={user?.images[0]?.url} alt="" />
      <h4>{user?.display_name}</h4>
    </div>
  );
}

export default Header;
