import { io } from "socket.io-client";

const socket = io("https://tick-tak-to-backend.onrender.com"); // your server URL
export default socket;
