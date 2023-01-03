import React from "react";
import "./PlayerOptionBtn.css";

const getOptionLetter = (optionNumber) => {
  switch (optionNumber) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return "";
  }
};

function PlayerOptionBtn({ optionNumber, onClick }) {
  return (
    <button className="player-option-btn" onClick={onClick}>
      <div className="player-option-btn-text">
        {getOptionLetter(optionNumber)}
      </div>
    </button>
  );
}

export default PlayerOptionBtn;

function PlayerOptionSelectedBtn({ optionNumber }) {
  return (
    <button className="player-option-selected-btn">
      <div className="player-option-selected-btn-text">
        {getOptionLetter(optionNumber)}
      </div>
    </button>
  );
}
function PlayerOptionRightBtn({ optionNumber }) {
  return (
    <button className="player-option-right-btn">
      <div className="player-option-right-btn-text">
        {getOptionLetter(optionNumber)}
      </div>
    </button>
  );
}
function PlayerOptionWrongBtn({ optionNumber }) {
  return (
    <button className="player-option-wrong-btn">
      <div className="player-option-wrong-btn-text">
        {getOptionLetter(optionNumber)}
      </div>
    </button>
  );
}

export { PlayerOptionSelectedBtn, PlayerOptionRightBtn, PlayerOptionWrongBtn };
