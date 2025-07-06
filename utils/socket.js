import { io } from "socket.io-client";

const socket = io(
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "https://jamblix.com"
    : "https://jamblix.com", // replace with your domain
  {
    autoConnect: false,
  }
);

export default socket;
