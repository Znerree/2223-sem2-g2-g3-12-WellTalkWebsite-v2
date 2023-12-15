import { Student } from "./student";

export type Request = {
  makeAppointmentid: number;
  date: string;
  decision: boolean;
  message: string;
  user: Student;
};
