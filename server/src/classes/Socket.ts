import { Server } from 'socket.io';
import type { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from 'types/sockets';

class SingleSocket {
  static instance: SingleSocket;

  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

  private constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.on('connection', (socket) => {
      console.log(`socket for client ${socket.id} connected`);
    });
  }

  static getInstance = (server?): SingleSocket => {
    if (!SingleSocket.instance) SingleSocket.instance = new SingleSocket(server);
    return this.instance;
  };
}

export default SingleSocket;
