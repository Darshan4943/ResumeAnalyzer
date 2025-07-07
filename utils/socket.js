import { io } from "socket.io-client";

const socket = io(
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "https://api.skilotech.com"
    : "https://api.skilotech.com", // replace with your domain
  {
    autoConnect: false,
  }
);

export default socket;
