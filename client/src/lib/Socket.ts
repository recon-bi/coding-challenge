/* eslint-disable no-use-before-define */
import API_URL from "config/api";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../types/sockets";

class SingleSocket {
  static instance: SingleSocket;
  // eslint-disable-next-line lines-between-class-members
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  private constructor() {
    this.socket = io(API_URL, { transports: ["websocket", "polling"], withCredentials: true });
    this.socket.on("connect", () => {
      console.log(`socket connected to ${API_URL}`);
    });
    this.socket.on("disconnect", () => {
      console.log(`socket disconnected from ${API_URL}`);
    });
  }

  static getInstance = (): SingleSocket => {
    if (!SingleSocket.instance) SingleSocket.instance = new SingleSocket();
    return this.instance;
  };

  registerSocketChannel(channelName: any, callback: any) {
    // console.log("Registering socket: ", channelName);
    this.socket.on(channelName, callback);
  }
}

export default SingleSocket;
