import { io } from "socket.io-client";

const socket = io(
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "https://api.skilotech.com"
    : "https://api.skilotech.com", 
  {
    autoConnect: false,
  }
);

export default socket;
