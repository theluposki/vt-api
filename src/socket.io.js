import { io } from "socket.io-client";

export const socket = io('https://localhost:4004', {
  // autoConnect: false,
  transports: ['websocket']
});

