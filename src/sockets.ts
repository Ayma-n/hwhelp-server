import { Server} from "socket.io";
import {addPersonToQueue, checkMatchesInQueueForGivenPerson as checkMatchesInQueueForGivenPerson, listOfStudentsInQueue, listOfTutorsInQueue} from './people.js';
import { Student, Tutor } from "./Types/Person.js";

export function setupWebSockets(httpServer: any, options: Object) {
    const io = new Server(httpServer, options);
    setInterval(checkIfMatch, 10, io);
    
    io.on("connection", (socket) => {
      // console.log(socket);
      // adds info about student/tutor to data structure
      socket.on("setup info for queue", (infoObj) => {
        console.log("info obj: ", infoObj);
        const personObj = {...infoObj, socketId: socket.id}
        addPersonToQueue(personObj);
        // for each person on queue, check if they have matched with anyone
        // TODO: fix, this is not good design
        console.log("list of students in queue: ", listOfStudentsInQueue);
        console.log("list of tutors in queue: ", listOfTutorsInQueue);
      //   const timer = setInterval(checkMatchesInQueueForGivenPerson, 10, socket, personObj);
      // });
      // sends when a student connects to a tutor
      socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
          content,
          from: socket.id,
        });
      });
    });
  });
}

export function checkIfMatch(io: Server) {
  for(let i = 0; i < listOfTutorsInQueue.length; i++) {
    const tutor = listOfTutorsInQueue[i] as Tutor;
    if(listOfStudentsInQueue.length > 0) {
      const student = listOfStudentsInQueue.pop() as Student;
      console.log("student: ", student);
      console.log("tutor: ", tutor);
      // tell both peers that they are now matched
      io.to(student.socketId).emit("waiting for queue", tutor);
      io.to(tutor.socketId).emit("waiting for queue", student);
      console.log("match made: ", student, tutor);
      listOfTutorsInQueue.pop();
    }
  }
}