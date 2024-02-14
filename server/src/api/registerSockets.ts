import SocketIO from 'classes/Socket';
// Import the mongoose models you want to attach a socket
import Bookings from './bookings/bookings.model'
// Add the model to an array and give it a channel name
//  - just use the end point name and make it easy on yourself ;)
const sockets = [
  { model: Bookings, channel: 'bookings' },
];

// const debugSockets = true;

async function emitChangeStream(data, channel) {
  console.info(data, channel);
  const socketServer = SocketIO.getInstance();
  const sockets = await socketServer.io.fetchSockets();

  sockets.forEach((client) => {
    console.info(client.id);
    client.emit(channel, data);
  });
}

export function createSockets() {
  sockets.forEach(({ model, channel }) => {
    console.info(`socket broadcasting changes on ${channel}`);
    model.watch().on('change', (data) => emitChangeStream(data, channel));
  });
}
