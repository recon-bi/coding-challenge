const mongoConnectionString = 'mongodb://localhost:27017/hotelsearch';
const mongoConnectionOptions = {};
const mongoConfig = {
  host: process.env.APPLICATION_API_DB,
  port: 27017,
  dbName: process.env.APPLICATION_API_DB,
  options: {},
};

export default { mongoConnectionOptions, mongoConnectionString, mongoConfig };
