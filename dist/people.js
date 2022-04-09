"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPersonToQueue = void 0;
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
exports.addPersonToQueue = addPersonToQueue;
//# sourceMappingURL=people.js.map