"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSockets = void 0;
const socket_io_1 = require("socket.io");
const people_js_1 = require("./people.js");
function setupWebSockets(httpServer, options) {
    const io = new socket_io_1.Server(httpServer, options);
    io.on("connection", (socket) => {
        socket.on("setup info for queue", (infoObj) => {
            console.log("info obj: ", infoObj);
            (0, people_js_1.addPersonToQueue)({ ...infoObj, socketId: socket.id });
            console.log("list of students in queue: ", people_js_1.listOfStudentsInQueue);
            console.log("list of tutors in queue: ", people_js_1.listOfTutorsInQueue);
            const timer = setInterval(people_js_1.checkMatchesInQueueForGivenPerson, 8000, socket, infoObj);
        });
        socket.on("private message", ({ content, to }) => {
            socket.to(to).emit("private message", {
                content,
                from: socket.id,
            });
        });
    });
}
exports.setupWebSockets = setupWebSockets;
//# sourceMappingURL=sockets.js.map