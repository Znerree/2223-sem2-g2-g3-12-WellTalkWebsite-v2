import axios from "@/api/axios";
import { useState, useEffect } from "react";

interface Referral {
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
}
const ReferredStudents = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    axios
      .get<Referral[]>("http://localhost:8080/referrals")
      .then((response) => {
        setReferrals(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving referrals:", error);
      });
  }, []);

  return (
    <>
      <h1 className=" font-semibold text-md border-b sticky top-0 bg-white py-4 pl-2">
        Referred Students
      </h1>
      <ul className=" p-2">
        {referrals.map((referral, index) => (
          <li
            key={index} // You should use a unique key for each list item
            className="border-b px-2 rounded-md shadow-sm py-2 border mb-2"
          >
            <p>
              {referral.student.firstname} {referral.student.lastname}
            </p>
            <div className="flex flex-col">
              <div className=" flex gap-2">
                <p className="text-gray-300 text-sm">
                  Course & Year:{" "}
                  <span className="text-primary">
                    {referral.student.course} - {referral.student.year}
                  </span>
                </p>
                <p className="text-gray-300 text-sm">
                  Referred by:{" "}
                  <span className="text-primary">
                    {referral.teacher.firstName} {referral.teacher.lastName}
                  </span>
                </p>
              </div>
              <p className="text-gray-300 text-sm flex-grow">
                Reason: <i className="text-primary">{referral.reason}</i>
              </p>
            </div>
            <button className="text-xs bg-primary text-white rounded-md p-1">
              Accept
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReferredStudents;
