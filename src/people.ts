import { Person, Student, Tutor } from './Types/Person';

export const listOfTutorsInQueue: Array<Tutor> = [];
export const listOfStudentsInQueue: Array<Student> = [];

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
  var listToRemove: Array<Person> = listOfTutorsInQueue;
  switch(personObj1.role) {
    case "student":
      listToSearch = listOfTutorsInQueue;
      listToRemove = listOfStudentsInQueue;
      break;
    default:
      listToSearch = listOfStudentsInQueue;
      listToRemove = listOfTutorsInQueue
      break;
  }
    if(listToSearch.length > 0) {
      const personObj2 = listToSearch.pop() as Person;
      console.log("personObj2: ", personObj2);
       // tell both peers that they are now matched
       socket.to(personObj2.socketId).emit("waiting for queue", personObj1);
       socket.to(personObj1.socketId).emit("waiting for queue", personObj2);
       socket.to(personObj1.socketId).emit("test", "test string: personObj2");
       console.log("person1 socket id", personObj1.socketId);
       socket.broadcast.emit("test", "testString")
       console.log("match made: ", personObj1, personObj2);
       listToRemove.pop();
       
    }
  }
