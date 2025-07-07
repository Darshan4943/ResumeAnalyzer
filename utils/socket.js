import { io } from "socket.io-client";

const socket = io(
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:2000"
    : "https://api.skilotech.com", 
  {
    autoConnect: false,
  }
);

export default socket;
