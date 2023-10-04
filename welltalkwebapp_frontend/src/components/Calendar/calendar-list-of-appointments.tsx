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
        setAppointments(
          response.data
            .sort(
              (a, b) =>
                new Date(a.start_date).getTime() -
                new Date(b.start_date).getTime()
            )
            .filter((appointment) => !appointment.isDone)
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving appointments:", error);
      });
  }, []);

  const today = new Date().toLocaleDateString();

  const todayAppointments = appointments.filter(
    (appointment) =>
      new Date(appointment.start_date).toLocaleDateString() === today
  );
  const upcomingAppointments = appointments.filter(
    (appointment) =>
      new Date(appointment.start_date).toLocaleDateString() !== today
  );

  return (
    <>
      <h1 className=" font-semibold text-md border-b sticky top-0 bg-white py-4 pl-2">
        My Appointments
      </h1>

      {todayAppointments.length > 0 && (
        <>
          <h2 className="font-sans text-md pt-2 pl-2">
            Today's Appointments
          </h2>
          <ul className=" p-2">
            {todayAppointments.map((appointment, index) => (
              <li
                key={index}
                className=" border-b px-2 rounded-md shadow-sm py-2 border mb-2 bg-tertiary"
              >
                <p className="text-white">
                  {appointment.student.firstname} {appointment.student.lastname}
                </p>
                <div className=" flex flex-col gap-2">
                  <div className=" flex flex-col">
                    <p className="text-gray-500 text-sm">
                      Course & Year:{" "}
                      <span className="text-primary">
                        {appointment.student.course} -{" "}
                        {appointment.student.year}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Student ID:{" "}
                      <span className="text-primary">
                        {appointment.student.studentID}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className=" text-gray-300 text-sm">
                      Date:{" "}
                      <span className="text-primary">
                        {new Date(appointment.start_date).toLocaleDateString()}
                      </span>
                    </p>
                    <p className=" text-gray-300 text-sm">
                      Start Time:{" "}
                      <span className="text-primary">
                        {new Date(appointment.start_date).toLocaleTimeString(
                          [],
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            second: undefined,
                          }
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {upcomingAppointments.length > 0 && (
        <>
          <h2 className="font-sans text-md pt-2 pl-2">
            Upcoming Appointments
          </h2>
          <ul className=" p-2">
            {upcomingAppointments.map((appointment, index) => (
              <li
                key={index}
                className=" border-b px-2 rounded-md shadow-sm py-2 border mb-2 bg-tertiary"
              >
                <p className="text-white">
                  {appointment.student.firstname} {appointment.student.lastname}
                </p>
                <div className=" flex flex-col gap-2">
                  <div className=" flex flex-col">
                    <p className="text-gray-500 text-sm">
                      Course & Year:{" "}
                      <span className="text-primary">
                        {appointment.student.course} -{" "}
                        {appointment.student.year}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Student ID:{" "}
                      <span className="text-primary">
                        {appointment.student.studentID}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className=" text-gray-300 text-sm">
                      Date:{" "}
                      <span className="text-primary">
                        {new Date(appointment.start_date).toLocaleDateString()}
                      </span>
                    </p>
                    <p className=" text-gray-300 text-sm">
                      Start Time:{" "}
                      <span className="text-primary">
                        {new Date(appointment.start_date).toLocaleTimeString(
                          [],
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            second: undefined,
                          }
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {todayAppointments.length === 0 && upcomingAppointments.length === 0 && (
        <p className=" text-gray-500 text-sm p-2">No appointments yet.</p>
      )}
    </>
  );
};

export default ListOfAppointments;
