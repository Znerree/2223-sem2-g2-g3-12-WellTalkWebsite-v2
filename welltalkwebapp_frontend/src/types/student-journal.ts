import { Student } from "./student";

export type StudentJournalType = {
  journalID?: number;
  userid: number;
  type: string;
  date: string;
  mood: string;
  title: string;
  message: string;
  author: Student;
  authorFname: string;
  authorLname: string;
};
