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
  studentID: string;
  start_date: string;
  isDone: boolean;
};
