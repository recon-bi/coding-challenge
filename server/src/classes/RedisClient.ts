// import { redisClient } from '../config/index';
// import { createClient } from 'redis';
// import errorHandler from '../error';
// import { log } from '../lib/errorLogging';

// class RedisClient {
//   static instance: RedisClient;

//   client: any;

//   public isConnected: boolean;

//   private constructor() {
//     this.isConnected = false;
//     this.client = createClient({
//       url: redisClient.host,
//     });
//     this.client.on('connect', () => {
//       log.info('Redis Client Connected');
//       this.isConnected = true;
//     });
//     this.client.on('disconnect', () => {
//       log.info('Redis Client Disconnected');
//       this.isConnected = false;
//     });
//     this.connect();
//   }

//   public connect = async () => {
//     try {
//       log.info(`Redis Client Host is ${redisClient.host}`);
//       if (this.client)
//         if( this.client.isOpen) return this.client
//       return await this.client.connect();
//     } catch (err: any) {
//       return errorHandler(err);
//     }
//   };

//   static getInstance = () => {
//     if (!RedisClient.instance) RedisClient.instance = new RedisClient();
//     return this.instance;
//   };
// }

// export default RedisClient;
