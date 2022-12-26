import React from "react";
import "./HostOption.css";

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

function HostOption({ optionNumber, optionText }) {
  return (
    <button className="host-option-btn">
      <div className="host-option-btn-text">
        {getOptionLetter(optionNumber)} : {optionText}
      </div>
    </button>
  );
}

export default HostOption;
