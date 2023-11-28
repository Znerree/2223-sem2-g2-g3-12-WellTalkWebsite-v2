export type Appointment = {
  id: number;
  counselor: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    schoolID: number;
    username: string;
    password: string;
    userType: string;
  };
  student: {
    id: number;
    course: string;
    year: number;
    email: string;
    firstname: string;
    lastname: string;
    studentID: number;
    department: string;
  };
  start_date: string;
  isDone: boolean;
};
