import axios from "@/api/axios";
import { Appointment } from "@/types/appointment";
import { useState, useEffect } from "react";
import { HiMiniPlusSmall, HiMiniMinusSmall } from "react-icons/hi2";

const ListOfAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isTodayAppointmentsOpen, setTodayAppointmentsOpen] = useState(true);
  const [isUpcomingAppointmentsOpen, setUpcomingAppointmentsOpen] = useState(true);

  const [isTodayDropdownOpen, setTodayDropdownOpen] = useState(false);
  const [isUpcomingDropdownOpen, setUpcomingDropdownOpen] = useState(false);

  const [refresher, setRefresher] = useState(0);

  useEffect(() => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .get<Appointment[]>("/myappointments", config)
      .then((response) => {
        setAppointments(
          response.data.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()).filter((appointment) => !appointment.isDone)
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving appointments:", error);
      });
  }, [refresher]);

  const today = new Date().toLocaleDateString();

  const todayAppointments = appointments.filter((appointment) => new Date(appointment.start_date).toLocaleDateString() === today);
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.start_date).toLocaleDateString() !== today);

  const expandTodayAppointments = () => {
    setTodayDropdownOpen(!isTodayDropdownOpen);
  };
  const expandUpcomingAppointments = () => {
    setUpcomingDropdownOpen(!isUpcomingDropdownOpen);
  };

  const handleMarkAsDone = (id: number) => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .put(`/appointments/${id}`, { isDone: true }, config)
      .then((response) => {
        setRefresher(Math.random());
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error marking appointment as done:", error);
      });
  };

  return (
    <>
      <div className=" overflow-y-auto">
        <div className="flex items-center justify-between pt-2">
          <h2 className="font-sans text-md top-0 pl-2">Today's Appointments</h2>

          <div className="flex items-center justify-between pr-2" onClick={expandTodayAppointments}>
            {isTodayDropdownOpen ? (
              <HiMiniPlusSmall
                className="text-black-300 h-6 w-6 cursor-pointer"
                onClick={() => {
                  setTodayAppointmentsOpen(!isTodayAppointmentsOpen);
                }}
              />
            ) : (
              <HiMiniMinusSmall
                className="text-black-300 h-6 w-6 cursor-pointer"
                onClick={() => {
                  setTodayAppointmentsOpen(!isTodayAppointmentsOpen);
                }}
              />
            )}
          </div>
        </div>
        {todayAppointments.length > 0 ? (
          <>
            <ul className={`p-2 ${isTodayAppointmentsOpen ? "" : "hidden"}`}>
              {todayAppointments.map((appointment, index) => (
                <li key={index} className=" border-b px-2 rounded-md shadow-sm py-2 border mb-2 bg-tertiary">
                  <p className="text-white">
                    {appointment.student.firstname} {appointment.student.lastname}
                  </p>
                  <div className=" flex flex-col gap-2">
                    <div className=" flex flex-col">
                      <p className="text-gray-500 text-sm">
                        Course & Year:{" "}
                        <span className="text-primary">
                          {appointment.student.course} - {appointment.student.year}
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Student ID: <span className="text-primary">{appointment.student.studentID}</span>
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className=" text-gray-300 text-sm">
                        Date: <span className="text-primary">{new Date(appointment.start_date).toLocaleDateString()}</span>
                      </p>
                      <p className=" text-gray-300 text-sm">
                        Start Time:{" "}
                        <span className="text-primary">
                          {new Date(appointment.start_date).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            second: undefined,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleMarkAsDone(appointment.id)} className=" text-white text-xs bg-secondary p-1 rounded-md mt-2">
                    Mark as done
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={`text-gray-500 text-sm p-2 ${isTodayAppointmentsOpen ? "" : "hidden"}`}>No appointments today.</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <h2 className="font-sans text-md top-0 pl-2">Upcoming Appointments</h2>
          <div className="flex items-center justify-between pr-2" onClick={expandUpcomingAppointments}>
            {isUpcomingDropdownOpen ? (
              <HiMiniPlusSmall
                className="text-black-300 h-6 w-6 cursor-pointer"
                onClick={() => {
                  setUpcomingAppointmentsOpen(!isUpcomingAppointmentsOpen);
                }}
              />
            ) : (
              <HiMiniMinusSmall
                className="text-black-300 h-6 w-6 cursor-pointer"
                onClick={() => {
                  setUpcomingAppointmentsOpen(!isUpcomingAppointmentsOpen);
                }}
              />
            )}
          </div>
        </div>
        {upcomingAppointments.length > 0 ? (
          <>
            <ul className={`p-2 ${isUpcomingAppointmentsOpen ? "" : "hidden"}`}>
              {upcomingAppointments.map((appointment, index) => (
                <li key={index} className=" border-b px-2 rounded-md shadow-sm py-2 border mb-2 bg-tertiary">
                  <p className="text-white">
                    {appointment.student.firstname} {appointment.student.lastname}
                  </p>
                  <div className=" flex flex-col gap-2">
                    <div className=" flex flex-col">
                      <p className="text-gray-500 text-sm">
                        Course & Year:{" "}
                        <span className="text-primary">
                          {appointment.student.course} - {appointment.student.year}
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Student ID: <span className="text-primary">{appointment.student.studentID}</span>
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className=" text-gray-300 text-sm">
                        Date: <span className="text-primary">{new Date(appointment.start_date).toLocaleDateString()}</span>
                      </p>
                      <p className=" text-gray-300 text-sm">
                        Start Time:{" "}
                        <span className="text-primary">
                          {new Date(appointment.start_date).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            second: undefined,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleMarkAsDone(appointment.id)} className=" text-white text-xs bg-secondary p-1 rounded-md mt-2">
                    Mark as done
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={`text-gray-500 text-sm p-2 ${isUpcomingAppointmentsOpen ? "" : "hidden"}`}>No upcoming appointments.</p>
        )}
      </div>
    </>
  );
};

export default ListOfAppointments;
