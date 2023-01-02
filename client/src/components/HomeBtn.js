import React from "react";
import "./HomeBtn.css";

import HomeIcon from "../assets/home_icon.png";

function HomeBtn({ iconSize = 24, onClick }) {
  return (
    <button className="lang-btn" onClick={onClick}>
      <img alt="Language" height={iconSize} src={HomeIcon} />
    </button>
  );
}

export default HomeBtn;
