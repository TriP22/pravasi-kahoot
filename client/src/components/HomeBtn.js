import React from "react";
import "./HomeBtn.css";

import HomeIcon from "../assets/home_icon.png";

function HomeBtn({ iconSize = 24 }) {
  return (
    <button className="lang-btn">
      <img alt="Language" height={iconSize} src={HomeIcon} />
    </button>
  );
}

export default HomeBtn;
