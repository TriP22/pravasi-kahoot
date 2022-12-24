import React from "react";
import "./PlayerOptionBtn.css";

const getOptionLetter = (optionNumber) => {
  switch (optionNumber) {
    case 1:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "D";
    default:
      return "";
  }
};

function PlayerOptionBtn({ iconSize = 24, optionNumber }) {
  return (
    <button className="player-option-btn">
      <div className="player-option-btn-text">
        {getOptionLetter(optionNumber)}
      </div>
    </button>
  );
}

export default PlayerOptionBtn;
