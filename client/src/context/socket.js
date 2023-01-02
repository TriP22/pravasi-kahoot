import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("http://10.100.92.171:3001");
export const SocketContext = React.createContext();
