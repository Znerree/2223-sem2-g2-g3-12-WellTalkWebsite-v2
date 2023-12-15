export type Referral = {
  id: number;
  teacher: {
    id: number;
    firstName: string;
    lastName: string;
  };
  studentID: string;
  date_referred: string;
  reason: string;
  isAccepted: boolean;
};
