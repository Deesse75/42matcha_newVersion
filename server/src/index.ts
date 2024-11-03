import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import isEnvConfigurate from './utils/env.service.js';
import { configMysql, mysqlDb } from './mysql/mysql.config.js';
import { manageSocket } from './socket/socket.services.js';
import authRouter from './auth/auth.route.js';
import userRouter from './user/user.route.js';
import listingRouter from './listing/listing.route.js';
import searchRouter from './search/search.route.js';
import chatRouter from './chat/chat.route.js';

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
  origin: domains,
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
app.use('/auth', authRouter);
app.use('/user', userRouter);
// app.use('/profile', profileRouter);
// app.use('/action', actionRouter);
app.use('/listing', listingRouter);
app.use('/search', searchRouter);
app.use('/chat', chatRouter);
app.use('/*', (req: Request, res: Response) => {
  res.status(404).json({
    message: "La ressource que vous essayez d'atteindre n'existe pas",
  });
});


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
