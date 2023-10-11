import axios from "@/api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  isAccepted: boolean;
}

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p>Are you sure you want to accept this referral?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 rounded-md p-2"
                onClick={onClose}
              >
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

const ReferredStudents = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Declare isModalOpen here
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Referral[]>("/referrals")
      .then((response) => {
        setReferrals(response.data.filter((referral) => !referral.isAccepted));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving referrals:", error);
      });
  }, []);

  const handleAcceptClick = (referral: Referral) => { 
    setSelectedReferral(referral);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAcceptConfirmation = () => {
    axios
    .put(`/referrals/${selectedReferral?.id}`, {}, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((response) => {
      console.log('Referral updated successfully', response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating referral:', error);
    });
  };


  return (
    <>
      <h1 className=" font-semibold text-md border-b sticky top-0 bg-white py-4 pl-2">
        Referred Students
      </h1>
      {referrals.length === 0 ? (
        <p className=" text-gray-500 text-sm p-2">No referrals yet.</p>
      ) : (
      <ul className=" p-2">
        {referrals.map((referral) => (
          <li
            key={referral.id} // You should use a unique key for each list item
            className="border-b px-2 rounded-md shadow-sm py-2 border mb-2"
          >
            <p>{referral.student.firstname} {referral.student.lastname}</p>
            <div className="flex flex-col">
              <div className=" flex gap-2">
                <p className="text-gray-500 text-sm">
                  Course & Year:{" "}
                  <span className="text-primary">
                    {referral.student.course} - {referral.student.year}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  Student ID:{" "}
                  <span className="text-primary">
                    {referral.student.studentID}
                  </span>
                </p>
              </div>
              <p className="text-gray-500 text-sm">
                Referred by:{" "}
                <span className="text-primary">
                  {referral.teacher.firstName} {referral.teacher.lastName}
                </span>
              </p>
                <p className="text-gray-500 text-sm mb-1">
                  Reason: <div className=" bg-gray-300 border rounded p-2"><i className="text-black flex flex-grow w-full break-all">{referral.reason}</i></div>
                </p>
            </div>
            <button onClick={() => handleAcceptClick(referral)} className="text-xs bg-primary text-white rounded-md p-1 focus:bg-tertiary active:bg-tertiary">
              Accept
            </button>
          </li>
        ))}
      </ul>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleAcceptConfirmation}
      />
    </>
  );
};

export default ReferredStudents;
