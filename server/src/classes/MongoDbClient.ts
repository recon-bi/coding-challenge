import { MongoClient } from 'mongodb';
import dbConfig from '/config/db';
import errorHandler from '../errorHandler';

class MongoDbClient {
  static instance: MongoDbClient;

  client: any;

  isConnected: boolean;

  private constructor() {
    this.isConnected = false;

    this.client = new MongoClient(dbConfig.mongoConnectionString, dbConfig.mongoConnectionOptions);

    this.client.on('serverOpening', () => {
      console.info('Mongo Client Connected to db');
      this.isConnected = true;
    });
    this.client.on('serverClosed', () => {
      console.info('Mongo Client Disconnected to db');
      this.isConnected = false;
    });

    this.connect();
  }

  public connect = async () => {
    try {
      return await this.client.connect();
    } catch (err: any) {
      return errorHandler(err);
    }
  };

  static getInstance = () => {
    if (!MongoDbClient.instance) MongoDbClient.instance = new MongoDbClient();
    return this.instance;
  };
}

export default MongoDbClient;
