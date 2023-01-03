import React, { useContext, useEffect, useState } from "react";

import { QRCode } from "react-qrcode-logo";
import "./index.css";
import SplashBg from "../assets/splash_bg.jpg";
import RegisterBg from "../assets/register_bg.jpg";
import Loader from "../assets/loader.svg";

import HomeBtn from "../components/HomeBtn";
import LanguageBtn from "../components/LanguageBtn";
import RestartGameBtn from "../components/RestartGameBtn";
import HostOption from "../components/HostOption";

import { SocketContext } from "../context/socket";
import Data from "../assets/data.json";

const Players = [
  {
    hostId: "kjsdnfkjs",
    playerId: "skvjnskjdv",
    name: "Bunty",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "asd",
    name: "Bubli",
    gameData: {},
  },

  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Jugmohan",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "skvjnskjdv",
    name: "Bunty",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "asd",
    name: "Bubli Bouncer",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "asd",
    name: "Bubli",
    gameData: {},
  },

  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Jugmohan Khan",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Puspa",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Jonti",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "jumjod",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Rappperiya",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Puspa",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Jonti",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "jumjod",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Puspa",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Jonti",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "jumjod",
    gameData: {},
  },
  {
    hostId: "kjsdnfkjs",
    playerId: "sfasfsaf",
    name: "Rappperiya",
    gameData: {},
  },
];

function Host() {
  const socket = useContext(SocketContext);

  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState("splash");
  const [language, setLanguage] = useState(0);
  const [timer, setTimer] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("language") !== null) {
      setLanguage(localStorage.getItem("language"));
    }

    socket.emit("HOST_JOIN");

    // If host already exists
    socket.on("HOST_FORCED_DISCONNECT", (data) => {
      if (socket.id === data) {
        window.location.href = "/";
      }
    });

    // To update game status
    socket.on("GAME_STATUS", (data) => {
      setGameStatus(data?.gameStatus);
    });

    // To update player list
    socket.on("PLAYER_LIST", (data) => {
      setPlayers(data?.players);
    });

    return () => {
      socket.off("HOST_FORCED_DISCONNECT");
      socket.off("GAME_STATUS");
      socket.off("PLAYER_LIST");
    };
  }, [socket]);

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

  const handleSplashToRegister = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "register" });
    setGameStatus("register");
  };

  const handleRegisterToLobby = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "lobby" });
    setGameStatus("lobby");
  };

  const handleLobbyToGame = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "game" });
    setGameStatus("game");
    setTimer(30);
  };
  const handleGameToResult = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "result" });
    setGameStatus("result");
  };

  const handleRestartGame = () => {
    socket.emit("HOST_GAME_STATUS", { gameStatus: "splash" });
    socket.emit("HOST_RESTART");
    setGameStatus("splash");
    setCurrentQuestion(0);
    setTimer(30);
  };

  const handleNextQuestion = () => {
    if (Data.languages[language].questions.length > currentQuestion + 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
      socket.emit("HOST_CURRENT_QUESTION", {
        currentQuestion: currentQuestion + 1,
      });
    } else {
      handleGameToResult();
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${RegisterBg})`,
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
            top: gameStatus === "splash" ? 0 : -1080,
            bottom: gameStatus === "splash" ? 0 : 1080,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: "all 0.3s ",
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 300,
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <LanguageBtn iconSize={40} onClick={handleLanguageChange} />
          </div>
          <div
            style={{
              minHeight: "100vh",
              overflow: "hidden",
              position: "absolute",
              top: gameStatus === "splash" ? 0 : -1080,
              bottom: gameStatus === "splash" ? 0 : 1080,
              left: 0,
              right: 0,
              zIndex: 200,
              transition: "all 0.3s ",
            }}
            onClick={handleSplashToRegister}
          ></div>
          <div style={{ backgroundColor: "fff" }} />
          <div className="host-splash-center">
            <div className="host-splash-heading">
              {Data.languages[language].title}
            </div>
          </div>
          <div className="host-splash-bottom-nav">
            <div className="host-splash-select-english">Select language</div>
            <div className="host-splash-select-hindi">भाषा का चयन करें</div>
          </div>
        </div>

        {/* REGISTER */}
        {gameStatus === "register" && (
          <>
            <div className="host-register-center">
              <div className="host-register-heading">
                {Data.languages[language].instructions}
              </div>
              <div className="host-register-subheading">
                {Data.languages[language].mintwo}
              </div>
              <div className="host-register-intro-content">
                1. {Data.languages[language].point1}
                <br /> 2. {Data.languages[language].point2}
                <br />
                3. {Data.languages[language].point3}
                <br />
                4. {Data.languages[language].point4}
              </div>
              <div
                style={{
                  padding: 48,
                }}
              >
                <QRCode
                  value={window.location.origin}
                  bgColor="#ffffff00"
                  fgColor="#ffffff"
                />
              </div>

              <div className="host-register-heading">
                {Data.languages[language].rules}
              </div>
              <div className="host-register-intro-content">
                1. {Data.languages[language].rule1} <br />
                2. {Data.languages[language].rule2}
                <br />
                3. {Data.languages[language].rule3}
                <br />
              </div>
            </div>

            <button
              className="host-register-next-btn"
              onClick={handleRegisterToLobby}
            >
              {Data.languages[language].next}
            </button>
          </>
        )}

        {/* LOBBY */}
        {gameStatus === "lobby" && (
          <>
            <div className="host-register-center">
              <div className="host-lobby-heading">
                {Data.languages[language].player_joined}
              </div>
            </div>
            <div className="host-lobby-center-names">
              {players.length > 0 ? (
                <div className="host-lobby-name-chip-wrap">
                  {players.map((item, index) => (
                    <div className="host-lobby-name-chip" key={index}>
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ paddingTop: 200 }}>
                  <img src={Loader} alt="loading..." height={150} />
                  <div className="host-lobby-waiting-heading">
                    {Data.languages[language].waiting}
                  </div>
                  <div className="host-lobby-subheading">
                    {Data.languages[language].for_players}
                  </div>
                </div>
              )}
            </div>
            {players.length > 1 && (
              <button
                className="host-lobby-start-btn"
                onClick={handleLobbyToGame}
              >
                {Data.languages[language].start}
              </button>
            )}
          </>
        )}

        {/* GAME */}
        {gameStatus === "game" && (
          <>
            <div className="host-game-question">
              {Data.languages[language].questions[currentQuestion].question}
            </div>
            <div className="host-game-center">
              <div className="host-game-options">
                <div className="host-game-options-col-1">
                  <div className="host-game-option-div">
                    <HostOption
                      optionNumber={0}
                      optionText={
                        Data.languages[language].questions[currentQuestion]
                          .options[0].text
                      }
                      selected={
                        timer === 0 &&
                        Data.languages[language].questions[currentQuestion]
                          .options[0].correct
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="host-game-option-div">
                    <HostOption
                      optionNumber={2}
                      optionText={
                        Data.languages[language].questions[currentQuestion]
                          .options[2].text
                      }
                      selected={
                        timer === 0 &&
                        Data.languages[language].questions[currentQuestion]
                          .options[2].correct
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div className="host-game-options-col-2">
                  <div className="host-game-timer-div">
                    <div className="host-game-timer-text">
                      {timer > 9 ? timer : `0${timer}`}
                    </div>
                  </div>
                </div>
                <div className="host-game-options-col-1">
                  <div className="host-game-option-div">
                    <HostOption
                      optionNumber={1}
                      optionText={
                        Data.languages[language].questions[currentQuestion]
                          .options[1].text
                      }
                      selected={
                        timer === 0 &&
                        Data.languages[language].questions[currentQuestion]
                          .options[1].correct
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="host-game-option-div">
                    <HostOption
                      optionNumber={3}
                      optionText={
                        Data.languages[language].questions[currentQuestion]
                          .options[3].text
                      }
                      selected={
                        timer === 0 &&
                        Data.languages[language].questions[currentQuestion]
                          .options[3].correct
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="host-game-numbers">
              {Data.languages[language].questions.map((item, index) => (
                <div
                  className={
                    index === currentQuestion
                      ? "host-game-number-selected"
                      : "host-game-number"
                  }
                  key={index}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {timer === 0 && (
              <button
                className="host-lobby-start-btn"
                onClick={handleNextQuestion}
              >
                {Data.languages[language].next}
              </button>
            )}
          </>
        )}

        {/* RESULT */}
        {gameStatus === "result" && (
          <>
            <div className="host-result-heading">
              Pravasi Bhartiya Diwas Quiz
            </div>
            <div className="host-result-subheading">Leaderboard</div>
          </>
        )}
        <div className="host-bottom-nav">
          <div
            style={{
              paddingLeft: 64,
              paddingBottom: 32,
            }}
          >
            <RestartGameBtn
              iconSize={40}
              onClick={handleRestartGame}
              text={Data.languages[language].restat_game}
            />
          </div>
          <div
            style={{
              paddingRight: 64,
              paddingBottom: 32,
              display: "flex",
            }}
          >
            <div
              style={{
                paddingRight: 16,
              }}
            >
              <HomeBtn iconSize={40} onClick={handleRestartGame} />
            </div>
            <LanguageBtn iconSize={40} onClick={handleLanguageChange} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Host;
