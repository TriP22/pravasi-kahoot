import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Host from "./Host";
import Player from "./Player";

import { SocketContext, socket } from "./context/socket";

// const socket = io.connect("http://localhost:3001");

function App() {
  // const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");

  // const sendMessage = () => {
  //   socket.emit("send_message", { message });
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived(data.message);
  //   });

  //   return () => {
  //     socket.off("receive_message");
  //   };
  // }, []);
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="" element={<Player />} />
            <Route exact path="host" element={<Host />} />
            {/* <Route
            exact
            path="message"
            element={
              <header className="App-header">
                <input
                  placeholder="Message..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button onClick={sendMessage}>Send Message</button>
                <h1>Message:</h1>
                <p>{messageReceived}</p>
              </header>
            }
          /> */}
            <Route path="*" element={<h6>Not found</h6>} />
          </Routes>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
