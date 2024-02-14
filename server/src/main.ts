import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import apiConfig from './config/db';
import morgan from 'morgan';
import cors from 'cors';
import SocketIO from './classes/Socket';
import { createSockets } from './api/registerSockets';
// import RedisClient from './classes/RedisClient';
import MongoDbClient from './classes/MongoDbClient';
import cookieParser from 'cookie-parser';
import { EventEmitter } from 'events';
import registerRoutes from './api/registerRoutes';
import { createServer } from 'http';
import { setup } from './setup';

// Create the express app
const app = express();

mongoose.set('strictQuery', true);

// Setup CORS
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

const main = createServer(app);

// Initialize the Singleton Socket class with the server
SocketIO.getInstance(main);

const port = process.env.API_PORT || 8080;

// Connect to MongoDB
mongoose.connect(apiConfig.mongoConnectionString, apiConfig.mongoConnectionOptions);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
mongoose.connection.on('connect', () =>
  console.info(`Connected to Mongo Server ${apiConfig.mongoConfig.host} on port ${apiConfig.mongoConfig.port}`),
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

EventEmitter.defaultMaxListeners = 15;
registerRoutes(app);
createSockets();

// RedisClient.getInstance();
MongoDbClient.getInstance();
setup()

main.listen(port, () => {
  console.info('--- System check complete ---');
  console.info(`API listening on port ${port}`);
});

export default app;
