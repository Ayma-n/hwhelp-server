// import express from 'express';
// import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";
import 'dotenv/config';
import {addPersonToQueue} from './people.js';

// const app = express();
const PORT_NUMBER: number = parseInt((process.env.PORT_NUMBER || "3000") as string);

const options: Object = {
  cors: {
    origin: "*",
  },
};
const httpServer = createServer();

const io: Server = new Server(httpServer, options);


io.on("connection", (socket) => {
  console.log(socket);
  // adds info about student/tutor to data structure
  socket.on("setup info for queue", (infoObj) => {
    console.log(infoObj);
    addPersonToQueue(infoObj);
  });
  // sends when a student connects to a tutor
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
});

httpServer.listen(PORT_NUMBER, () => {
  console.log(`listening on port ${PORT_NUMBER}`);
});
