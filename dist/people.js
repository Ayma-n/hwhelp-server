"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMatchesInQueueForGivenPerson = exports.addPersonToQueue = exports.listOfStudentsInQueue = exports.listOfTutorsInQueue = void 0;
exports.listOfTutorsInQueue = [];
exports.listOfStudentsInQueue = [];
function addStudentToQueue(studentObj) {
    exports.listOfStudentsInQueue.push(studentObj);
}
function addTutorToQueue(studentObj) {
    exports.listOfTutorsInQueue.push(studentObj);
}
function addPersonToQueue(personObj) {
    switch (personObj.role) {
        case "tutor":
            addTutorToQueue(personObj);
            break;
        default:
            addStudentToQueue(personObj);
            break;
    }
}
exports.addPersonToQueue = addPersonToQueue;
function checkMatchesInQueueForGivenPerson(socket, personObj1) {
    var listToSearch = exports.listOfStudentsInQueue;
    var listToRemove = exports.listOfTutorsInQueue;
    switch (personObj1.role) {
        case "student":
            listToSearch = exports.listOfTutorsInQueue;
            listToRemove = exports.listOfStudentsInQueue;
            break;
        default:
            listToSearch = exports.listOfStudentsInQueue;
            listToRemove = exports.listOfTutorsInQueue;
            break;
    }
    if (listToSearch.length > 0) {
        const personObj2 = listToSearch.pop();
        console.log("personObj2: ", personObj2);
        socket.to(personObj2.socketId).emit("waiting for queue", personObj1);
        socket.to(personObj1.socketId).emit("waiting for queue", personObj2);
        socket.to(personObj1.socketId).emit("test", "test string: personObj2");
        console.log("person1 socket id", personObj1.socketId);
        socket.broadcast.emit("test", "testString");
        console.log("match made: ", personObj1, personObj2);
        listToRemove.pop();
    }
}
exports.checkMatchesInQueueForGivenPerson = checkMatchesInQueueForGivenPerson;
//# sourceMappingURL=people.js.map