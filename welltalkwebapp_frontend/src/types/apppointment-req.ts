export type Request = {
  id: number;
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
  date_created: string;
  time_created: string;
  message: string;
  decision: boolean;
};
