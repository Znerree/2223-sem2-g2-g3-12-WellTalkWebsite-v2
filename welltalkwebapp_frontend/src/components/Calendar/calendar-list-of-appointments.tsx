import axios from "@/api/axios";
import { useState, useEffect } from "react";

interface Appointment {
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
}

const ListOfAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .get<Appointment[]>("/myappointments", config)
      .then((response) => {
        setAppointments(response.data.filter((appointment) => !appointment.isDone));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving appointments:", error);
      });
  }, []);

  return (
    <>
      <h1 className=" font-semibold text-md border-b sticky top-0 bg-white py-4 pl-2">
        List of Appointments
      </h1>
      <ul className=" p-2">
        <li className=" border-b px-2 rounded-md shadow-sm py-2 border">
          <p>Jake Errenz</p>
          <div className=" flex gap-2">
            <p className=" text-gray-300 text-sm">
              Date: <span className="text-primary">June 10, 2020</span>
            </p>
            <p className=" text-gray-300 text-sm">
              Time: <span className="text-primary">10:00 am</span>
            </p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ListOfAppointments;
