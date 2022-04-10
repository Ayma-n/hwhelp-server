"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfMatch = exports.setupWebSockets = void 0;
const socket_io_1 = require("socket.io");
const people_js_1 = require("./people.js");
const uuid_1 = require("uuid");
function setupWebSockets(httpServer, options) {
    const io = new socket_io_1.Server(httpServer, options);
    setInterval(checkIfMatch, 10, io);
    io.on("connection", (socket) => {
        socket.on("setup info for queue", (infoObj) => {
            console.log("info obj: ", infoObj);
            const personObj = { ...infoObj, socketId: socket.id };
            (0, people_js_1.addPersonToQueue)(personObj);
            console.log("list of students in queue: ", people_js_1.listOfStudentsInQueue);
            console.log("list of tutors in queue: ", people_js_1.listOfTutorsInQueue);
            socket.on("private message", ({ content, to }) => {
                socket.to(to).emit("private message", {
                    content,
                    from: socket.id,
                });
            });
            socket.on("caller setup", (req) => {
                const firstPeerId = (0, uuid_1.v4)();
                const secondPeerId = (0, uuid_1.v4)();
                io.to(socket.id).emit("caller response", { callerPeerId: firstPeerId, receiverPeerId: secondPeerId });
                io.to(req).emit("receiver response", secondPeerId);
            });
        });
    });
}
exports.setupWebSockets = setupWebSockets;
function checkIfMatch(io) {
    for (let i = 0; i < people_js_1.listOfTutorsInQueue.length; i++) {
        const tutor = people_js_1.listOfTutorsInQueue[i];
        if (people_js_1.listOfStudentsInQueue.length > 0) {
            const student = people_js_1.listOfStudentsInQueue.pop();
            console.log("student: ", student);
            console.log("tutor: ", tutor);
            io.to(student.socketId).emit("waiting for queue", tutor);
            io.to(tutor.socketId).emit("waiting for queue", student);
            console.log("match made: ", student, tutor);
            people_js_1.listOfTutorsInQueue.pop();
        }
    }
}
exports.checkIfMatch = checkIfMatch;
//# sourceMappingURL=sockets.js.map