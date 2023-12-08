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
    userid: number;
    firstName: string;
    lastName: string;
    course: string;
    email: string;
    password: string;
    phoneNumber: number;
    studentId: number;
  };

  start_date: string;
  isDone: boolean;
};
