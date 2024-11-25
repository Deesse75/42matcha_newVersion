import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import isEnvConfigurate from './utils/env.service.js';
import { configMysql, mysqlDb } from './mysql/mysql.config.js';
import { manageSocket } from './socket/socket.services.js';
import actionRoute from './action/action.route.js';
import authRoute from './auth/auth.route.js';
import listingRoute from './listing/listing.route.js';
import searchRoute from './search/search.route.js';
import userRoute from './user/user.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

//configure environment
dotenv.config();
try {
  isEnvConfigurate();
} catch (error) {
  console.error(error);
  process.exit(1);
}

//connect to database
(async () => {
  try {
    await configMysql();
  } catch (error) {
    //do nothing wait the next connection
  }
})();

//config cors
const domains = process.env.DOMAINS_CORS || '';
const corsOptions = {
  origin: domains, //origin: domains.split(','),
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

//launch server
const app = express();
const server = createServer(app);
app.use(cors(corsOptions));

//socket management
const io = new Server(server, {
  cors: {
    origin: domains,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});
manageSocket(io);

//Routes
app.use(express.json({ limit: '100mb' }));
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/action', actionRoute);
app.use('/listing', listingRoute);
app.use('/search', searchRoute);
// app.use('/chat', chatRoute);

//gestion des entrees d'url dans le navigateur en mode prod
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const matchaPath = path.join(__dirname, '..', 'dist');
// console.log('matchaPath', matchaPath);
// app.use(express.static(matchaPath));
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(matchaPath, 'index.js'));
// });

// Start the server
server.listen(8001, () => {
  console.log('Server is listening on port 8001...');
});

//Disconnect if server is stopped with SIGINT or SIGTERM
process.on('SIGINT', async () => {
  try {
    await mysqlDb.end();
  } catch (error) {
    console.error('MySQL was not properly disconnected: ', error);
    process.exit(1);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  try {
    await mysqlDb.end();
  } catch (error) {
    console.error('MySQL was not properly disconnected: ', error);
    process.exit(1);
  }
  process.exit(0);
});
