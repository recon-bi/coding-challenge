type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
};

type ClientToServerEvents = {
  hello: () => void;
};

type InterServerEvents = {
  ping: () => void;
};

type SocketData = {
  name: string;
  age: number;
};

export { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData };
