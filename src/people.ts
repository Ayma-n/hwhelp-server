import { Person, Student, Tutor } from './Types/Person';

const listOfTutorsInQueue: Array<Tutor> = [];
const listOfStudentsInQueue: Array<Student> = [];

function addStudentToQueue(studentObj: Student) {
  listOfStudentsInQueue.push(studentObj);
}

function addTutorToQueue(studentObj: Tutor) {
  listOfTutorsInQueue.push(studentObj);
}

export function addPersonToQueue(personObj: Person) {
  switch (personObj.role) {
    case "tutor":
      addTutorToQueue(personObj as Tutor);
      break;
    default:
      addStudentToQueue(personObj as Student);
      break;
  }
}

export function checkMatchesInQueueForGivenPerson(socket: any,personObj1: Person) {
  var listToSearch: Array<Person> = listOfStudentsInQueue;
  switch(personObj1.role) {
    case "student":
      listToSearch = listOfStudentsInQueue;
      break;
    default:
      listToSearch = listOfTutorsInQueue;
      break;
  }
    if(listToSearch.length > 0) {
      const personObj2 = listToSearch.pop() as Person;
       // tell both peers that they are now matched
       socket.to(personObj2.socketId).emit("waiting for queue", personObj1);
       socket.to(personObj1.socketId).emit("waiting for queue", personObj2);
    }
  }
