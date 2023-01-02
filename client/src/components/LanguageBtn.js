import React from "react";
import "./LanguageBtn.css";

import LangIcon from "../assets/lang_icon.png";

function LanguageBtn({ iconSize = 24, onClick }) {
  return (
    <button className="lang-btn" onClick={onClick}>
      <img alt="Language" height={iconSize} src={LangIcon} />
    </button>
  );
}

export default LanguageBtn;
