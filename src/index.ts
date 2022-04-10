// import express from 'express';
// import cors from 'cors';
import { createServer } from "http";
import 'dotenv/config';
import { setupWebSockets } from './sockets';

// const app = express();
const PORT_NUMBER: number = parseInt((process.env.PORT_NUMBER || "8000") as string);

const options: Object = {
  cors: {
    origin: "*",
  },
};

const httpServer = createServer();

setupWebSockets(httpServer, options);

httpServer.listen(PORT_NUMBER, () => {
  console.log(`listening on port ${PORT_NUMBER}`);
});


