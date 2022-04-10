export interface Person {
    displayName: string,
    email: string,
    institution: string,
    role: string,
    socketId: string,
  }
  
 export interface Student extends Person {
    request: string;
  }
  
  export interface Tutor extends Person {
    expertise: string;
  }