import React from "react";
import "./HostOption.css";

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

function HostOption({ optionNumber, optionText, selected }) {
  return (
    <button className={selected ? "host-option-btn-right" : "host-option-btn"}>
      <div
        className={
          selected ? "host-option-btn-text-right" : "host-option-btn-text"
        }
      >
        {getOptionLetter(optionNumber)} : {optionText}
      </div>
    </button>
  );
}

export default HostOption;
