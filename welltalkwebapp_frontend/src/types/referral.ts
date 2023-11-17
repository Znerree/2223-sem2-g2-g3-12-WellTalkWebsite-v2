export type Referral = {
  id: number;
  student: {
    id: number;
    course: string;
    year: number;
    firstname: string;
    lastname: string;
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
