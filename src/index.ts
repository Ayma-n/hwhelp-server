// import express from 'express';
// import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";
import 'dotenv/config';

// const app = express();
const PORT_NUMBER: number = parseInt((process.env.PORT_NUMBER || "3000") as string);

const options: Object = {
  cors: {
    origin: "*",
  },
};
const httpServer = createServer();

const io: Server = new Server(httpServer, options);

const listOfTutorsInQueue: Tutor[] = [];
const listOfStudentsInQueue: Student[] = [];

interface Person {
  id: string;
  name: string;
  role: string;
}

interface Student extends Person {
  request: string;
}

interface Tutor extends Person {
  expertise: string;
}

function addStudentToQueue(studentObj: Student) {
  listOfStudentsInQueue.push(studentObj);
}

function addTutorToQueue(studentObj: Tutor) {
  listOfTutorsInQueue.push(studentObj);
}

function addPersonToQueue(personString: string) {
  const personObj: Person = JSON.parse(personString);
  switch (personObj.role) {
    case "tutor":
      addTutorToQueue(personObj as Tutor);
      break;
    default:
      addStudentToQueue(personObj as Student);
      break;
  }
}

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
