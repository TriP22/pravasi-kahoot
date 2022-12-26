import React, { useState } from "react";

import { QRCode } from "react-qrcode-logo";
import "./index.css";
import SplashBg from "../assets/splash_bg.jpg";
import RegisterBg from "../assets/register_bg.jpg";
import Loader from "../assets/loader.svg";

import HomeBtn from "../components/HomeBtn";
import LanguageBtn from "../components/LanguageBtn";
import RestartGameBtn from "../components/RestartGameBtn";
import HostOption from "../components/HostOption";

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
        <div className="host-splash-center">
          <div className="host-splash-heading">Pravasi Bhartiya Diwas Quiz</div>
        </div>
        <div className="host-splash-bottom-nav">
          <div className="host-splash-select-english">Select language</div>
          <div className="host-splash-select-hindi">भाषा का चयन करें</div>
          <LanguageBtn iconSize={40} />
        </div>
      </div> */}

      {/* SPLASH */}
      {/* <div
        style={{
          backgroundImage: `url(${RegisterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="host-register-center">
          <div className="host-register-heading">Instructions</div>
          <div className="host-register-subheading">
            ( Minimum two players are required to play the game )
          </div>
          <div className="host-register-intro-content">
            1. Pick a device among the five devices in front of you. <br />
            2. Enter your name in one of the device and start the game <br />
            3. To play with your own device connect it to the lorem Wi-Fi <br />
            4. Then scan the QR Code below to play the game
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

          <div className="host-register-heading">Rules</div>
          <div className="host-register-intro-content">
            1. Each Question only has one correct answer <br />
            2. Each Person will have 30 seconds to answer the question <br />
            3. The first person to give the right answer will get more points
            <br />
          </div>
        </div>
        <div className="host-bottom-nav">
          <div
            style={{
              paddingLeft: 64,
              paddingBottom: 32,
            }}
          >
            <RestartGameBtn iconSize={40} />
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
              <HomeBtn iconSize={40} />
            </div>
            <LanguageBtn iconSize={40} />
          </div>
        </div>
      </div> */}

      {/* LOBBY */}
      {/* <div
        style={{
          backgroundImage: `url(${RegisterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="host-register-center">
          <div className="host-lobby-heading">Players joined so far</div>
        </div>
        <div className="host-lobby-center-names">
          {Players.length > 0 ? (
            <div className="host-lobby-name-chip-wrap">
              {Players.map((item, index) => (
                <div className="host-lobby-name-chip" key={index}>
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            <>
              <img src={Loader} alt="loading..." height={150} />
              <div className="host-lobby-waiting-heading">Waiting...</div>
              <div className="host-lobby-subheading">for players to join</div>
            </>
          )}
        </div>
        <button className="host-lobby-start-btn">Start</button>
        <div className="host-bottom-nav">
          <div
            style={{
              paddingLeft: 64,
              paddingBottom: 32,
            }}
          >
            <RestartGameBtn iconSize={40} />
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
              <HomeBtn iconSize={40} />
            </div>
            <LanguageBtn iconSize={40} />
          </div>
        </div>
      </div> */}

      {/* GAME */}
      {/* <div
        style={{
          backgroundImage: `url(${RegisterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="host-game-question">
          When was the Pravasi Bhartiya Diwas held for the first time? When was
          the Pravasiya Diwas held for the first time? When was Pravasi Bhartiya
          Diwas held for the first time?
        </div>
        <div className="host-game-center">
          <div className="host-game-options">
            <div className="host-game-options-col-1">
              <div className="host-game-option-div">
                <HostOption optionNumber={1} optionText={"2021"} />
              </div>
              <div className="host-game-option-div">
                <HostOption optionNumber={3} optionText={"1947"} />
              </div>
            </div>
            <div className="host-game-options-col-2">
              <div className="host-game-timer-div">
                <div className="host-game-timer-text">30</div>
              </div>
            </div>
            <div className="host-game-options-col-1">
              <div className="host-game-option-div">
                <HostOption optionNumber={2} optionText={"1800"} />
              </div>
              <div className="host-game-option-div">
                <HostOption optionNumber={4} optionText={"2022"} />
              </div>
            </div>
          </div>
        </div>
        <div className="host-game-numbers">
          {[2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 5, 5].map((item, index) => (
            <div
              className={
                index === 2 ? "host-game-number-selected" : "host-game-number"
              }
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <button className="host-lobby-start-btn">Next</button>

        <div className="host-bottom-nav">
          <div
            style={{
              paddingLeft: 64,
              paddingBottom: 32,
            }}
          >
            <RestartGameBtn iconSize={40} />
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
              <HomeBtn iconSize={40} />
            </div>
            <LanguageBtn iconSize={40} />
          </div>
        </div>
      </div> */}

      {/* RESULT */}
      <div
        style={{
          backgroundImage: `url(${RegisterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="host-result-heading">Pravasi Bhartiya Diwas Quiz</div>
        <div className="host-result-subheading">Leaderboard</div>
        <div className="host-bottom-nav">
          <div
            style={{
              paddingLeft: 64,
              paddingBottom: 32,
            }}
          >
            <RestartGameBtn iconSize={40} />
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
              <HomeBtn iconSize={40} />
            </div>
            <LanguageBtn iconSize={40} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Host;
