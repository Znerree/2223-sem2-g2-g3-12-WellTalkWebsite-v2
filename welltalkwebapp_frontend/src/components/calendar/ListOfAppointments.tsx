import axios from "@/api/axios";
import { Appointment } from "@/types/appointment";
import { useState, useEffect } from "react";
import { HiMiniPlusSmall, HiMiniMinusSmall } from "react-icons/hi2";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

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
          <ul className={`p-2 ${isTodayAppointmentsOpen ? "" : "hidden"}`}>
            {todayAppointments.map((appointment, index) => (
              <li key={index}>
                <Card className="p-2 bg-primary-700">
                  <p className=" text-sm text-white ">
                    Student name: {""}
                    {appointment.student ? (
                      <span className=" text-white underline underline-offset-2 font-semibold">
                        {appointment.student.firstName} {appointment.student.lastName}
                      </span>
                    ) : (
                      <span className=" text-gray-500 font-semibold">Not found</span>
                    )}
                  </p>
                  <p className=" text-sm text-white">
                    Appointed by: {""}
                    {appointment.counselor ? (
                      <span className=" text-white underline underline-offset-2 font-semibold">
                        {appointment.counselor.firstName} {appointment.counselor.lastName}
                      </span>
                    ) : (
                      <span className="text-primary-200">Not found</span>
                    )}
                  </p>

                  <p className=" text-sm text-white">
                    Date: {""}
                    {appointment.start_date ? (
                      <span className=" text-white underline underline-offset-2 font-semibold">
                        {new Date(appointment.start_date).toLocaleDateString([], {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                      </span>
                    ) : (
                      <span className="text-primary-200">Not found</span>
                    )}
                  </p>

                  <p className=" text-white text-sm">
                    Start Time:{" "}
                    <span className=" text-white underline underline-offset-2 font-semibold">
                      {new Date(appointment.start_date).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        second: undefined,
                      })}
                    </span>
                  </p>

                  <Button size={"sm"} className=" rounded-md text-white" onClick={() => handleMarkAsDone(appointment.id)} variant={"default"}>
                    Mark as done
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
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
          <ul className={`p-2 ${isUpcomingAppointmentsOpen ? "" : "hidden"}`}>
            {upcomingAppointments.map((appointment, index) => (
              <li key={index}>
                <Card className="p-2 bg-primary-700">
                  <p className=" text-sm text-white ">
                    Student name: {""}
                    {appointment.student ? (
                      <span className=" text-white underline underline-offset-2 font-semibold">
                        {appointment.student.firstName} {appointment.student.lastName}
                      </span>
                    ) : (
                      <span className=" text-gray-500 font-semibold">Not found</span>
                    )}
                  </p>
                  <p className=" text-sm text-white">
                    Appointed by: {""}
                    {appointment.counselor ? (
                      <span className=" text-white underline underline-offset-2 font-semibold">
                        {appointment.counselor.firstName} {appointment.counselor.lastName}
                      </span>
                    ) : (
                      <span className="text-primary-200">Not found</span>
                    )}
                  </p>

                  <p className=" text-sm text-white">
                    Date: {""}
                    {appointment.start_date ? (
                      <span className=" text-white underline underline-offset-2 font-semibold">
                        {new Date(appointment.start_date).toLocaleDateString([], {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                      </span>
                    ) : (
                      <span className="text-primary-200">Not found</span>
                    )}
                  </p>

                  <p className=" text-white text-sm">
                    Start Time:{" "}
                    <span className=" text-white underline underline-offset-2 font-semibold">
                      {new Date(appointment.start_date).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        second: undefined,
                      })}
                    </span>
                  </p>

                  <Button size={"sm"} className=" rounded-md text-white" onClick={() => handleMarkAsDone(appointment.id)} variant={"default"}>
                    Mark as done
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-gray-500 text-sm p-2 ${isUpcomingAppointmentsOpen ? "" : "hidden"}`}>No upcoming appointments.</p>
        )}
      </div>
    </>
  );
};

export default ListOfAppointments;
