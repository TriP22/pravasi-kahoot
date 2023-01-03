import React, { useContext, useEffect, useState } from "react";

import "./index.css";
import SplashBg from "../assets/splash_bg_mob.jpg";
import BackgroundImage from "../assets/register_bg.png";
import Loader from "../assets/loader.svg";
import LanguageBtn from "../components/LanguageBtn";
import HomeBtn from "../components/HomeBtn";
import PlayerOptionBtn, {
  PlayerOptionRightBtn,
  PlayerOptionSelectedBtn,
  PlayerOptionWrongBtn,
} from "../components/PlayerOptionBtn";

import { SocketContext } from "../context/socket";
import Data from "../assets/data.json";

function Player() {
  const socket = useContext(SocketContext);

  const [nickName, setNickName] = useState("");
  const [gameStatus, setGameStatus] = useState("splash");
  const [language, setLanguage] = useState(0);
  const [timer, setTimer] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionSelected, setOptionSelected] = useState(false);

  const handleNameChange = (event) => {
    setNickName(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("language") !== null) {
      setLanguage(localStorage.getItem("language"));
    }

    socket.emit("PLAYER_JOIN");

    socket.on("HOST_NONE", () => {
      alert("No host found to start the Quiz");
    });

    socket.on("GAME_STATUS", (data) => {
      setGameStatus(data?.gameStatus);

      if (data?.gameStatus === "game") {
        setTimer(30);
        setCurrentQuestion(0);
      }
    });

    socket.on("CURRENT_QUESTION", (data) => {
      setCurrentQuestion(data.currentQuestion);
      setTimer(30);
      setOptionSelected(null);
    });

    return () => {
      socket.off("HOST_NONE");
      socket.off("GAME_STATUS");
      socket.off("CURRENT_QUESTION");
    };
  }, [socket]);

  useEffect(() => {
    if (gameStatus === "splash") {
      setNickName("");
    }
  }, [gameStatus]);

  useEffect(() => {
    if (timer > 0) {
      let timer1 = setTimeout(() => setTimer(timer - 1), 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [timer]);

  const handleLanguageChange = () => {
    if (language === 0) {
      setLanguage(1);
      localStorage.setItem("language", 1);
    } else {
      setLanguage(0);
      localStorage.setItem("language", 0);
    }
  };

  // function openFullscreen() {
  //   var elem = document.getElementById("fullScreen");
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Safari */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE11 */
  //     elem.msRequestFullscreen();
  //   }
  // }

  const handleSplashToRegister = () => {
    setGameStatus("register");
    // openFullscreen();
  };

  const handleRestartGame = () => {
    setGameStatus("splash");
    setCurrentQuestion(0);
    setTimer(30);
    socket.emit("PLAYER_RESTART");
  };

  const handleRegisterPlayer = () => {
    setGameStatus("lobby");
    socket.emit("PLAYER_REGISTER", { nickName });
  };

  const handlePlayerAnswer = (num, data) => {
    if (data && timer > 0) {
      socket.emit("PLAYER_ANSWER", { timer });
    }
    if (timer > 0) {
      setOptionSelected(num);
    }
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
        id="fullScreen"
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
        >
          {gameStatus === "splash" && (
            <div
              style={{
                position: "fixed",
                zIndex: 300,
                bottom: 100,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <LanguageBtn onClick={handleLanguageChange} />
            </div>
          )}
          <div
            style={{
              minHeight: "100vh",
              overflow: "hidden",
              position: "absolute",
              top: gameStatus === "splash" ? 0 : "-100vh",
              bottom: gameStatus === "splash" ? 0 : "100vh",
              left: 0,
              right: 0,
              zIndex: 200,
              transition: "all 0.3s ",
            }}
            onClick={handleSplashToRegister}
          ></div>
          <div className="splash-center">
            <div className="splash-heading">
              {Data.languages[language].title}
            </div>
            <div className="splash-select-english">Select language</div>
            <div className="splash-select-hindi">भाषा का चयन करें</div>
          </div>
        </div>

        {/* REGISTER */}
        {gameStatus === "register" && (
          <>
            <div className="register-center">
              <div className="register-heading">
                {Data.languages[language].register_yourself}
              </div>

              <div style={{ padding: 16 }}>
                <input
                  className="register-input"
                  placeholder={Data.languages[language].nickname}
                  maxLength={10}
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={nickName}
                  onChange={handleNameChange}
                />
              </div>

              {nickName?.length > 2 && (
                <button
                  className="register-next-btn"
                  onClick={handleRegisterPlayer}
                >
                  {Data.languages[language].next}
                </button>
              )}
            </div>
            <div className="player-nav">
              <div className="player-home-btn">
                <HomeBtn onClick={handleRestartGame} />
              </div>
              <div className="player-lg-btn">
                <LanguageBtn onClick={handleLanguageChange} />
              </div>
            </div>
          </>
        )}

        {/* LOBBY */}
        {gameStatus === "lobby" && (
          <>
            <div className="lobby-center">
              <img src={Loader} alt="loading..." height={100} />
              <div className="lobby-heading">
                {Data.languages[language].waiting}
              </div>
              <div className="lobby-subheading">
                {Data.languages[language].for_host}
              </div>
            </div>
            <div className="player-nav">
              <div className="player-home-btn">
                <HomeBtn onClick={handleRestartGame} />
              </div>
              <div className="player-lg-btn">
                <LanguageBtn onClick={handleLanguageChange} />
              </div>
            </div>
          </>
        )}

        {/* GAME */}
        {gameStatus === "game" && (
          <>
            <div className="game-center">
              <div className="game-question">
                {Data.languages[language].questions[currentQuestion].question}
              </div>
              <div className="game-options">
                <div className="game-options-col-1">
                  <div className="game-option-div">
                    {optionSelected === 0 ? (
                      timer === 0 ? (
                        Data.languages[language].questions[currentQuestion]
                          .options[0].correct ? (
                          <PlayerOptionRightBtn optionNumber={0} />
                        ) : (
                          <PlayerOptionWrongBtn optionNumber={0} />
                        )
                      ) : (
                        <PlayerOptionSelectedBtn optionNumber={0} />
                      )
                    ) : (
                      <PlayerOptionBtn
                        optionNumber={0}
                        onClick={() =>
                          optionSelected
                            ? null
                            : handlePlayerAnswer(
                                0,
                                Data.languages[language].questions[
                                  currentQuestion
                                ].options[0].correct
                              )
                        }
                      />
                    )}
                  </div>
                  <div className="game-option-div">
                    {optionSelected === 2 ? (
                      timer === 0 ? (
                        Data.languages[language].questions[currentQuestion]
                          .options[2].correct ? (
                          <PlayerOptionRightBtn optionNumber={2} />
                        ) : (
                          <PlayerOptionWrongBtn optionNumber={2} />
                        )
                      ) : (
                        <PlayerOptionSelectedBtn optionNumber={2} />
                      )
                    ) : (
                      <PlayerOptionBtn
                        optionNumber={2}
                        onClick={() =>
                          optionSelected
                            ? null
                            : handlePlayerAnswer(
                                2,
                                Data.languages[language].questions[
                                  currentQuestion
                                ].options[2].correct
                              )
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="game-options-col-2">
                  <div className="game-timer-div">
                    <div className="game-timer-text">
                      {timer > 9 ? timer : `0${timer}`}
                    </div>
                  </div>
                </div>
                <div className="game-options-col-1">
                  <div className="game-option-div">
                    {optionSelected === 1 ? (
                      timer === 0 ? (
                        Data.languages[language].questions[currentQuestion]
                          .options[1].correct ? (
                          <PlayerOptionRightBtn optionNumber={1} />
                        ) : (
                          <PlayerOptionWrongBtn optionNumber={1} />
                        )
                      ) : (
                        <PlayerOptionSelectedBtn optionNumber={1} />
                      )
                    ) : (
                      <PlayerOptionBtn
                        optionNumber={1}
                        onClick={() =>
                          optionSelected
                            ? null
                            : handlePlayerAnswer(
                                1,
                                Data.languages[language].questions[
                                  currentQuestion
                                ].options[1].correct
                              )
                        }
                      />
                    )}
                  </div>
                  <div className="game-option-div">
                    {optionSelected === 3 ? (
                      timer === 0 ? (
                        Data.languages[language].questions[currentQuestion]
                          .options[3].correct ? (
                          <PlayerOptionRightBtn optionNumber={3} />
                        ) : (
                          <PlayerOptionWrongBtn optionNumber={3} />
                        )
                      ) : (
                        <PlayerOptionSelectedBtn optionNumber={3} />
                      )
                    ) : (
                      <PlayerOptionBtn
                        optionNumber={3}
                        onClick={() =>
                          optionSelected
                            ? null
                            : handlePlayerAnswer(
                                3,
                                Data.languages[language].questions[
                                  currentQuestion
                                ].options[3].correct
                              )
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="game-question-numbers">
                {Data.languages[language].questions.map((item, index) => (
                  <div
                    key={index}
                    className={
                      index === currentQuestion
                        ? "game-question-number-selected"
                        : "game-question-number"
                    }
                  >
                    <div className="game-question-number-text">{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div className="player-home-btn">
                <HomeBtn onClick={handleRestartGame} />
              </div>
              <div className="player-lg-btn">
                <LanguageBtn onClick={handleLanguageChange} />
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
