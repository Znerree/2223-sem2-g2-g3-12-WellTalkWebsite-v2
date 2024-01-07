import axios, { STUDENT_BASE_API } from "@/api/axios";
import { Request } from "@/types/apppointment-req";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const AppointmentRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Declare isModalOpen here
  const [selectedRequest, setSelectedRequest] = useState<Request | null>();
  const [refresher, setRefresher] = useState(0);

  useEffect(() => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .get<Request[]>(STUDENT_BASE_API + "/getAppointments", config)
      .then((response) => {
        setRequests(response.data.filter((requests) => !requests.decision));
      })
      .catch((error) => {
        console.error("Error retrieving requests:", error);
      });
  }, [refresher]);

  const handleAcceptConfirmation = (makeAppointmentid: number) => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    axios
      .put(STUDENT_BASE_API + `/${makeAppointmentid}`, config)
      .then((response) => {
        setRefresher(refresher + 1);
      })
      .catch((error) => {
        console.error("Error accepting appointment request:", error);
      });
  };

  return (
    <>
      <div className=" overflow-y-auto">
        {requests.length === 0 ? (
          <p className=" text-gray-500 text-sm p-2">No requests yet.</p>
        ) : (
          <ul className=" p-2">
            {requests.map((request) => (
              <li key={request.user.userid} className="border-b px-2 rounded-md shadow-sm py-2 border mb-2 bg-slate-100">
                <p className=" font-semibold">
                  {request.user.firstName} {request.user.lastName}
                </p>
                <p>
                  Requested on -{" "}
                  <span className=" text-primary-500">
                    {new Date(request.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}, <br />
                    {new Date(request.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </p>
                <div className="flex flex-col">
                  <div key={request.user.userid} className=" flex gap-2">
                    <div className="text-gray-500 text-sm">
                      Course: <span className="text-primary-500">{request.user.course}</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      Student ID: <span className="text-primary-500">{request.user.studentID}</span>
                    </div>
                  </div>

                  <div className="text-gray-500 text-sm mb-1 mt-2">
                    Message:
                    <div className=" bg-gray-300 border rounded p-2">
                      <i className="text-black flex flex-grow w-full break-all">{request.message}</i>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size={"sm"} className=" rounded-lg">
                        Accept
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to accept this requested appointment?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleAcceptConfirmation(request.makeAppointmentid)}>Accept</AlertDialogAction>{" "}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AppointmentRequests;
