import React from "react";
import "./LanguageBtn.css";

import LangIcon from "../assets/lang_icon.png";

function LanguageBtn({ iconSize = 24 }) {
  return (
    <button className="lang-btn">
      <img alt="Language" height={iconSize} src={LangIcon} />
    </button>
  );
}

export default LanguageBtn;
