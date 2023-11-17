import axios from "@/api/axios";
import { Request } from "@/types/apppointment-req";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p>Are you sure you want to accept this request?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-300 text-gray-700 rounded-md p-2" onClick={onClose}>
                Cancel
              </button>
              <button
                className="bg-primary text-white rounded-md p-2 ml-2"
                onClick={() => {
                  onConfirm();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AppointmentRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Declare isModalOpen here
  const [selectedRequest, setSelectedRequest] = useState<Request | null>();
  const [refresher, setRefresher] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Request[]>("/requests/all")
      .then((response) => {
        setRequests(response.data.filter((requests) => !requests.decision));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving requests:", error);
      });
  }, [refresher]);

  const handleAcceptClick = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAcceptConfirmation = () => {
    axios
      .put(
        `/requests/${selectedRequest?.id}`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log("Request updated successfully", response.data);
        setRefresher(Math.random());
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating request:", error);
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
              <li
                key={request.id} // You should use a unique key for each list item
                className="border-b px-2 rounded-md shadow-sm py-2 border mb-2"
              >
                <p>
                  {request.student.firstname} {request.student.lastname}
                  <span className=" text-gray-400 text-xs">
                    {" "}
                    - {new Date(request.date_created).toLocaleDateString()} {request.time_created}
                  </span>
                </p>
                <div className="flex flex-col">
                  <div className=" flex gap-2">
                    <div className="text-gray-500 text-sm">
                      Course & Year:{" "}
                      <span className="text-primary">
                        {request.student.course} - {request.student.year}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      Student ID: <span className="text-primary">{request.student.studentID}</span>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm mb-1 mt-2">
                    Message:{" "}
                    <div className=" bg-gray-300 border rounded p-2">
                      <i className="text-black flex flex-grow w-full break-all">{request.message}</i>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAcceptClick(request)}
                  className="text-xs bg-primary text-white rounded-md p-1 focus:bg-tertiary active:bg-tertiary"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleAcceptConfirmation} />
    </>
  );
};

export default AppointmentRequests;
