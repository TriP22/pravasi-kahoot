import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Host from "./Host";
import Player from "./Player";

import { SocketContext, socket } from "./context/socket";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="player" element={<Player />} />
            <Route exact path="" element={<Host />} />
            <Route path="*" element={<h6>Not found</h6>} />
          </Routes>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
