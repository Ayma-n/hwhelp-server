"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMatchesInQueueForGivenPerson = exports.addPersonToQueue = void 0;
const listOfTutorsInQueue = [];
const listOfStudentsInQueue = [];
function addStudentToQueue(studentObj) {
    listOfStudentsInQueue.push(studentObj);
}
function addTutorToQueue(studentObj) {
    listOfTutorsInQueue.push(studentObj);
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
    var listToSearch = listOfStudentsInQueue;
    switch (personObj1.role) {
        case "student":
            listToSearch = listOfStudentsInQueue;
            break;
        default:
            listToSearch = listOfTutorsInQueue;
            break;
    }
    if (listToSearch.length > 0) {
        const personObj2 = listToSearch.pop();
        socket.to(personObj2.socketId).emit("waiting for queue", personObj1);
        socket.to(personObj1.socketId).emit("waiting for queue", personObj2);
    }
}
exports.checkMatchesInQueueForGivenPerson = checkMatchesInQueueForGivenPerson;
//# sourceMappingURL=people.js.map