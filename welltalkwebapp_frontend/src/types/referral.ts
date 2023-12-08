export type Referral = {
  id: number;
  student: {
    id: number;
    course: string;
    year: number;
    firstName: string;
    lastName: string;
    studentID: number;
  };
  teacher: {
    id: number;
    firstName: string;
    lastName: string;
  };
  date_referred: string;
  reason: string;
  isAccepted: boolean;
};
