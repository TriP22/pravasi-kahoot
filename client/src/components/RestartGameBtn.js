import React from "react";
import "./RestartGameBtn.css";

function RestartGameBtn({ iconSize = 24 }) {
  return (
    <button className="lang-btn">
      <div
        style={{
          lineHeight: `${iconSize}px`,
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: 18,

          color: "#573D2A",
        }}
      >
        Restart Game
      </div>
    </button>
  );
}

export default RestartGameBtn;
