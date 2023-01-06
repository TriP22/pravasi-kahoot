import React from "react";
import socketio from "socket.io-client";
import config from "../config.json";

export const socket = socketio.connect(`http://${config.ip}:3001`);
export const SocketContext = React.createContext();
