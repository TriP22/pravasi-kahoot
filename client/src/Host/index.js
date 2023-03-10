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
import PodiumImg from "../assets/podium.svg";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/celebration";
import config from "../config.json";

function Host() {
  const socket = useContext(SocketContext);

  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState("splash");
  const [language, setLanguage] = useState(0);
  const [timer, setTimer] = useState(15);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showMid, setShowMid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("language") !== null) {
      setLanguage(localStorage.getItem("language"));
    }

    socket.emit("HOST_JOIN");

    // If host already exists
    socket.on("HOST_FORCED_DISCONNECT", (data) => {
      if (socket.id === data) {
        window.location.href = "/player";
      }
    });

    // To update game status
    socket.on("GAME_STATUS", (data) => {
      setGameStatus(data?.gameStatus);
    });

    // To update player list
    socket.on("PLAYER_LIST", (players) => {
      var sortedData = JSON.parse(players)
        .sort((a, b) => b?.score - a?.score)
        ?.reverse();
      setPlayers(sortedData);
      // setPlayers(players);
      console.log(sortedData, JSON.parse(players));
    });

    socket.on("RESULTS_TO_ALL", (players) => {
      var sortedData = JSON.parse(players).sort((a, b) => b?.score - a?.score);
      setPlayers(sortedData);
      // setPlayers(data?.players);
      console.log(players);
    });

    socket.on("PLAYER_DATA_UPDATE", (players) => {
      var sortedData = JSON.parse(players).sort((a, b) => b?.score - a?.score);
      setPlayers(sortedData);
      // setPlayers(players);
      console.log(players);
    });

    return () => {
      socket.off("HOST_FORCED_DISCONNECT");
      socket.off("GAME_STATUS");
      socket.off("PLAYER_LIST");
      socket.off("RESULTS_TO_ALL");
      socket.off("PLAYER_DATA_UPDATE");
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
    setTimer(15);
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
    setTimer(15);
  };

  const handleNextQuestion = () => {
    if (Data.languages[language].questions.length > currentQuestion + 1) {
      setShowMid(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(15);
        socket.emit("HOST_CURRENT_QUESTION", {
          currentQuestion: currentQuestion + 1,
        });
        setShowMid(false);
      }, 5000);
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
          position: "relative",
        }}
      >
        {/* Mid screen */}
        <div
          style={{
            backgroundImage: `url(${RegisterBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: showMid ? 0 : 1080,
            bottom: showMid ? 0 : 1080,
            // top: 0,
            // bottom: 0,
            left: 0,
            right: 0,
            transition: "all 0.3s ",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "absolute",
              height: 24,
              width: showMid ? "100vw" : 0,
              transition: "all 5s",
              background: "#FFECBC",
            }}
          />
          <img className="host-result-podium" src={PodiumImg} alt="..." />
          {/* 1st Rank */}
          {players?.length > 0 && (
            <>
              <div className="host-first-rank-name-card">
                {players[0]?.name}
              </div>
              <div className="host-first-rank-details">
                <div className="host-first-rank-details-place">
                  {Data.languages[language].first_place}
                </div>
                <div className="host-first-rank-details-score">
                  {Data.languages[language].score}
                </div>
                <div className="host-first-rank-details-point">
                  {players[0]?.score} {Data.languages[language].points}
                </div>
              </div>
            </>
          )}

          {/* 2nd Rank */}
          {players?.length > 1 && (
            <>
              <div className="host-second-rank-name-card">
                {players[1]?.name}
              </div>
              <div className="host-second-rank-details">
                <div className="host-second-rank-details-place">
                  {Data.languages[language].second_place}
                </div>
                <div className="host-second-rank-details-score">
                  {Data.languages[language].score}
                </div>
                <div className="host-second-rank-details-point">
                  {players[1]?.score} {Data.languages[language].points}
                </div>
              </div>
            </>
          )}
          {/* 3rd Rank */}
          {players?.length > 2 && (
            <>
              <div className="host-third-rank-name-card">
                {players[2]?.name}
              </div>
              <div className="host-third-rank-details">
                <div className="host-third-rank-details-place">
                  {Data.languages[language].third_place}
                </div>
                <div className="host-third-rank-details-score">
                  {Data.languages[language].score}
                </div>
                <div className="host-third-rank-details-point">
                  {players[2]?.score} {Data.languages[language].points}
                </div>
              </div>
            </>
          )}
          {/* Other Ranks */}
          {players?.length > 3 && (
            <div className="host-other-rank">
              {players?.slice(3, players.length).map((item, index) => (
                <div className="host-other-rank-card" key={index}>
                  <div className="host-other-rank-name">{item?.name}</div>
                  <div className="host-other-rank-number">{index + 4}th</div>
                </div>
              ))}
            </div>
          )}
        </div>

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
            <div className="host-splash-select-hindi">???????????? ?????? ????????? ????????????</div>
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
                  padding: 24,
                }}
              >
                <QRCode
                  value={`http://${config.ip}:3000/player`}
                  bgColor="#ffffff00"
                  fgColor="#ffffff"
                  size={300}
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
              {players?.length > 0 ? (
                <div className="host-lobby-name-chip-wrap">
                  {players?.map((item, index) => (
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
            {players?.length > 1 && (
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
              {Data.languages[language].results}
            </div>
            <img className="host-result-podium" src={PodiumImg} alt="..." />
            {/* 1st Rank */}
            {players?.length > 0 && (
              <>
                <div className="host-first-rank-name-card">
                  {players[0]?.name}
                </div>
                <div className="host-first-rank-details">
                  <div className="host-first-rank-details-place">
                    {Data.languages[language].first_place}
                  </div>
                  <div className="host-first-rank-details-score">
                    {Data.languages[language].score}
                  </div>
                  <div className="host-first-rank-details-point">
                    {players[0]?.score} {Data.languages[language].points}
                  </div>
                </div>
              </>
            )}

            {/* 2nd Rank */}
            {players?.length > 1 && (
              <>
                <div className="host-second-rank-name-card">
                  {players[1]?.name}
                </div>
                <div className="host-second-rank-details">
                  <div className="host-second-rank-details-place">
                    {Data.languages[language].second_place}
                  </div>
                  <div className="host-second-rank-details-score">
                    {Data.languages[language].score}
                  </div>
                  <div className="host-second-rank-details-point">
                    {players[1]?.score} {Data.languages[language].points}
                  </div>
                </div>
              </>
            )}

            {/* 3rd Rank */}
            {players?.length > 2 && (
              <>
                <div className="host-third-rank-name-card">
                  {players[2]?.name}
                </div>
                <div className="host-third-rank-details">
                  <div className="host-third-rank-details-place">
                    {Data.languages[language].third_place}
                  </div>
                  <div className="host-third-rank-details-score">
                    {Data.languages[language].score}
                  </div>
                  <div className="host-third-rank-details-point">
                    {players[2]?.score} {Data.languages[language].points}
                  </div>
                </div>
              </>
            )}
            {/* Other Ranks */}
            {players?.length > 3 && (
              <div className="host-other-rank">
                {players?.slice(3, players.length).map((item, index) => (
                  <div className="host-other-rank-card" key={index}>
                    <div className="host-other-rank-name">{item?.name}</div>
                    <div className="host-other-rank-number">{index + 4}th</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ position: "absolute" }}>
              <Lottie
                isClickToPauseDisabled
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,

                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={1080}
                width={1920}
              />
            </div>
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
