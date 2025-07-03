// socket.js
import { io } from "socket.io-client";

const socket = io("https://jamblix.com", {
  autoConnect: false, // prevents auto connect on import
});

export default socket;
