import React, { useState } from "react";
import "./index.css";
import SplashBg from "../assets/splash_bg_mob.jpg";
import BackgroundImage from "../assets/register_bg.png";
import Loader from "../assets/loader.svg";
import LanguageBtn from "../components/LanguageBtn";
import HomeBtn from "../components/HomeBtn";
import PlayerOptionBtn from "../components/PlayerOptionBtn";

function Player() {
  const [firstName, setFirstName] = useState("");

  const handleNameChange = (event) => {
    setFirstName(event.target.value);
  };
  return (
    <>
      {/* SPLASH */}
      {/* <div
        style={{
          backgroundImage: `url(${SplashBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="splash-center">
          <div className="splash-heading">Pravasi Bhartiya Diwas Quiz</div>
          <div className="splash-select-english">Select language</div>
          <div className="splash-select-hindi">भाषा का चयन करें</div>
          <div className="splash-lg-btn">
            <LanguageBtn />
          </div>
        </div>
      </div> */}

      {/* REGISTER */}
      {/* <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="register-center">
          <div className="register-heading">Register Yourself</div>

          <div style={{ padding: 16 }}>
            <input
              className="register-input"
              placeholder="Nickname"
              maxLength={20}
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={handleNameChange}
            />
          </div>

          <button className="register-next-btn">Next</button>
        </div>
        <div className="player-nav">
          <div className="player-home-btn">
            <HomeBtn />
          </div>
          <div className="player-lg-btn">
            <LanguageBtn />
          </div>
        </div>
      </div> */}

      {/* LOBBY */}
      {/* <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="lobby-center">
          <img src={Loader} alt="loading..." height={100} />
          <div className="lobby-heading">Waiting...</div>
          <div className="lobby-subheading">for players to join</div>
        </div>
        <div className="player-nav">
          <div className="player-home-btn">
            <HomeBtn />
          </div>
          <div className="player-lg-btn">
            <LanguageBtn />
          </div>
        </div>
      </div> */}

      {/* GAME */}
      {/* <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          //   overflow: "hidden",
        }}
      >
        <div className="game-center">
          <div className="game-question">
            When was the Pravasi Bhartiya Diwas held for the first time?
          </div>
          <div className="game-options">
            <div className="game-options-col-1">
              <div className="game-option-div">
                <PlayerOptionBtn optionNumber={1} />
              </div>
              <div className="game-option-div">
                <PlayerOptionBtn optionNumber={3} />
              </div>
            </div>
            <div className="game-options-col-2">
              <div className="game-timer-div">
                <div className="game-timer-text">30</div>
              </div>
            </div>
            <div className="game-options-col-1">
              <div className="game-option-div">
                <PlayerOptionBtn optionNumber={2} />
              </div>
              <div className="game-option-div">
                <PlayerOptionBtn optionNumber={4} />
              </div>
            </div>
          </div>

          <div className="game-question-numbers">
            {[{}, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 4, 4, 4, 44].map(
              (item, index) => (
                <div
                  key={index}
                  className={
                    index === 2
                      ? "game-question-number-selected"
                      : "game-question-number"
                  }
                >
                  <div className="game-question-number-text">{index + 1}</div>
                </div>
              )
            )}
          </div>
        </div>
        <div
          style={{
            height: 84,
          }}
        />
        <div className="player-game-nav">
          <div
            style={{
              position: "absolute",
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100%",
              width: "100%",
              overflow: "hidden",
            }}
          />
          <div className="player-home-btn">
            <HomeBtn />
          </div>
          <div className="player-lg-btn">
            <LanguageBtn />
          </div>
        </div>
      </div> */}

      {/* RESULT */}
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="result-center">
          <div className="result-result-text">Your Result</div>
          <div className="result-congrats-text">CONGRATULATIONS!</div>
          <div className="result-heading">YOU WON</div>
          <div className="result-rank">
            <div className="result-rank-text">111</div>
          </div>
          <button className="result-restart-btn">
            <div className="result-restart-btn-text">Restart Game</div>
          </button>
        </div>
        <div className="player-nav">
          <div className="player-home-btn">
            <HomeBtn />
          </div>
          <div className="player-lg-btn">
            <LanguageBtn />
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
