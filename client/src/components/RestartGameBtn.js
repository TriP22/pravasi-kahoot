import React from "react";
import "./RestartGameBtn.css";

function RestartGameBtn({ iconSize = 24, onClick, text }) {
  return (
    <button className="lang-btn" onClick={onClick}>
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
        {text}
      </div>
    </button>
  );
}

export default RestartGameBtn;
