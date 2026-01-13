import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    socket = io("http://localhost:8000", {
      autoConnect: false,
      transports: ["websocket"],
      auth: { token },
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) s.connect();
};
