import React, { useContext, useEffect, useState } from "react";

import "./index.css";
import SplashBg from "../assets/splash_bg_mob.jpg";
import BackgroundImage from "../assets/register_bg.png";
import Loader from "../assets/loader.svg";
import LanguageBtn from "../components/LanguageBtn";
import HomeBtn from "../components/HomeBtn";
import PlayerOptionBtn from "../components/PlayerOptionBtn";

import { SocketContext } from "../context/socket";
import Data from "../assets/data.json";

function Player() {
  const socket = useContext(SocketContext);

  const [nickName, setNickName] = useState("");
  const [gameStatus, setGameStatus] = useState("splash");
  const [language, setLanguage] = useState(0);

  const handleNameChange = (event) => {
    setNickName(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("language") !== null) {
      console.log(`language exists`);
      setLanguage(localStorage.getItem("language"));
    } else {
      console.log(`language not found`);
    }
    socket.emit("PLAYER_JOIN");

    socket.on("HOST_NONE", () => {
      // console.log("host ko shuru karne de bhai");
      alert("No host found to start the Quiz");
    });

    socket.on("GAME_STATUS", (data) => {
      setGameStatus(data?.gameStatus);
    });

    return () => {
      socket.off("HOST_NONE");
      socket.off("GAME_STATUS");
    };
  }, [socket]);

  useEffect(() => {
    if (gameStatus === "splash") {
      setNickName("");
    }
  }, [nickName]);

  const handleLanguageChange = () => {
    if (language === 0) {
      setLanguage(1);
      localStorage.setItem("language", 1);
    } else {
      setLanguage(0);
      localStorage.setItem("language", 0);
    }
  };

  const handleSplashToRegister = () => {
    setGameStatus("register");
  };

  const handleRegisterToLobby = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "lobby" });
    setGameStatus("lobby");
  };

  const handleLobbyToGame = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "game" });
    setGameStatus("game");
  };

  const handleRestartGame = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "splash" });
    setGameStatus("splash");
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* SPLASH */}
        <div
          style={{
            backgroundImage: `url(${SplashBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            overflow: "hidden",
            position: "absolute",
            top: gameStatus === "splash" ? 0 : "-100vh",
            bottom: gameStatus === "splash" ? 0 : "100vh",
            left: 0,
            right: 0,
            zIndex: 100,
            transition: "all 0.3s ",
          }}
          onClick={() => {
            setGameStatus("register");
          }}
        >
          <div className="splash-center">
            <div className="splash-heading">
              {Data.languages[language].title}
            </div>
            <div className="splash-select-english">Select language</div>
            <div className="splash-select-hindi">भाषा का चयन करें</div>
            <div className="splash-lg-btn">
              <LanguageBtn onClick={handleLanguageChange} />
            </div>
          </div>
        </div>

        {/* REGISTER */}
        {gameStatus === "register" && (
          <>
            <div className="register-center">
              <div className="register-heading">Register Yourself</div>

              <div style={{ padding: 16 }}>
                <input
                  className="register-input"
                  placeholder="Nickname"
                  maxLength={10}
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={nickName}
                  onChange={handleNameChange}
                />
              </div>

              {nickName?.length > 2 && (
                <button className="register-next-btn">Next</button>
              )}
            </div>
            <div className="player-nav">
              <div className="player-home-btn">
                <HomeBtn />
              </div>
              <div className="player-lg-btn">
                <LanguageBtn />
              </div>
            </div>
          </>
        )}

        {/* LOBBY */}
        {gameStatus === "lobby" && (
          <>
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
          </>
        )}

        {/* GAME */}
        {gameStatus === "game" && (
          <>
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
                      <div className="game-question-number-text">
                        {index + 1}
                      </div>
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
          </>
        )}

        {/* RESULT */}
        {gameStatus === "result" && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default Player;
