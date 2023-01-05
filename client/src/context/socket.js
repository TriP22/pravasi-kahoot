import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("http://192.168.1.13:3001");
export const SocketContext = React.createContext();
