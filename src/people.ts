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

export function addPersonToQueue(personString: string) {
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
