"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
require("dotenv/config");
const PORT_NUMBER = parseInt((process.env.PORT_NUMBER || "3000"));
const options = {
    cors: {
        origin: "*",
    },
};
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, options);
const listOfTutorsInQueue = [];
const listOfStudentsInQueue = [];
function addStudentToQueue(studentObj) {
    listOfStudentsInQueue.push(studentObj);
}
function addTutorToQueue(studentObj) {
    listOfTutorsInQueue.push(studentObj);
}
function addPersonToQueue(personString) {
    const personObj = JSON.parse(personString);
    switch (personObj.role) {
        case "tutor":
            addTutorToQueue(personObj);
            break;
        default:
            addStudentToQueue(personObj);
            break;
    }
}
io.on("connection", (socket) => {
    console.log(socket);
    socket.on("setup info for queue", (infoObj) => {
        console.log(infoObj);
        addPersonToQueue(infoObj);
    });
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
//# sourceMappingURL=index.js.map