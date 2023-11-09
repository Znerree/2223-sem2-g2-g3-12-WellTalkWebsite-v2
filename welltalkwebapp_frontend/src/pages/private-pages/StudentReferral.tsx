import axios from "@/api/axios";
import ReferralHeader from "@/components/ReferralHeader";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useStudentSearch from "@/actions/search-student-actions";
import { AiOutlineClose } from "react-icons/ai";

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
  counselor: {
    id: number;
    firstName: string;
    lastName: string;
  };
  date_referred: string;
  reason: string;
  isAccepted: boolean;
}

export const StudentReferral = () => {
  // css style for input
  const inputStyle = {
    borderBottom: "2px solid #769EAB",
    background: "transparent",
    outline: "none",
    width: "100%",
    padding: "2px 2px",
    marginBottom: "16px",
  };

  const [referrer, setReferrer] = useState<any>({});
  const [reason, setReason] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showListofReferrals, setShowListOfReferrals] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [refresher, setRefresher] = useState(0);
  const acceptedReferrals = referrals.filter((referral) => referral.isAccepted);
  const pendingReferrals = referrals.filter((referral) => !referral.isAccepted);

  const {
    useFetchStudents,
    handleQueryChange,
    handleStudentInput,
    value,
    setQuery,
    setValue,
    studentID,
    query,
    setStudentId,
    setResults,
    results,
    showResultsDropdown,
    setShowResultsDropdown,
    handleClear,
  } = useStudentSearch();
  const { students } = useFetchStudents();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleReasonChange = (event: any) => {
    const selectedReason = event.target.value;
    setReason(selectedReason);
    console.log(selectedReason);
    if (selectedReason === "Other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  const handleOtherReasonChange = (event: any) => {
    const otherReason = event.target.value;
    setReason(otherReason);
    console.log(otherReason);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:8080/users/username/${username}`);
        console.log(response.data);
        setReferrer(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("/referrals?student=" + studentID + "&teacher=" + referrer.id, { reason: reason });
      console.log(response.data);
      alert("Student Referral successfully!");
      setValue("");
      setQuery("");
      setResults([]);
      setReason("");
      setShowOtherInput(false);
      setRefresher(Math.random());
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(event, students, setResults, setShowResultsDropdown, setValue, setQuery);
  };

  const openListOfReferrals = () => {
    setShowListOfReferrals(true);
  };

  const closeListOfReferrals = () => {
    setShowListOfReferrals(false);
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get(`/referrals/teachers?teacherid=${referrer.id}`);
        //console.log(response.data);
        setReferrals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReferrals();
  }, [referrer.id, refresher]);

  return (
    <>
      <div className=" h-full">
        <div className=" px-4 flex justify-between">
          <h1>
            Good day! {""}
            <b>
              {referrer.firstName} {referrer.lastName}
            </b>
          </h1>
          <button onClick={openListOfReferrals} className=" rounded-full bg-tertiary text-white p-2 text-xs hover:bg-opacity-90">
            Check status of referrals
          </button>
        </div>
        {showListofReferrals && (
          <div className=" overflow-y-auto fixed z-50 h-screen w-full bg-gray-900 bg-opacity-70 top-0 right-0 flex items-center justify-center">
            <div className=" bg-white w-96 h-[500px] overflow-y-auto rounded-lg flex flex-col">
              <span className=" flex justify-between w-full py-2">
                <h1>{""}</h1>
                <AiOutlineClose className=" cursor-pointer mr-3 mt-3 hover:text-primary" onClick={closeListOfReferrals} />
              </span>
              <span className=" px-2 flex justify-center w-full sticky mb-4">
                <b>Referral Status</b>
              </span>
              <span className=" w-full px-4">
                <div>
                  <h2 className="text-sm mb-2 font-semibold">Accepted Referrals</h2>
                  <ul>
                    {acceptedReferrals.map((referral) => (
                      <li key={referral.id} className=" bg-tertiary rounded-md py-3 text-white px-2 text-sm mb-2 shadow">
                        <h1>
                          {referral.student.firstname} {referral.student.lastname}
                        </h1>
                        <div className=" flex justify-between ">
                          <p className=" text-xs text-gray-400">
                            Counselor:{" "}
                            <span className=" text-white italic">
                              {referral.counselor.firstName} {referral.counselor.lastName}
                            </span>
                          </p>
                          <p>{referral.isAccepted ? <span className=" text-green-500">Accepted</span> : <span className=" text-red-500">Pending</span>}</p>
                        </div>
                        <p className=" text-xs text-gray-400">
                          Reason: <span className=" text-white">{referral.reason}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className=" text-sm mb-2 font-semibold">Pending Referrals</h2>
                  <ul>
                    {pendingReferrals.map((referral) => (
                      <li key={referral.id} className=" bg-tertiary rounded-md py-3 text-white px-2 text-sm mb-2 shadow">
                        <h1>
                          {referral.student.firstname} {referral.student.lastname}
                        </h1>
                        <div className=" flex justify-between">
                          <p className=" text-xs text-gray-400">
                            Reason: <span className=" text-white">{referral.reason}</span>
                          </p>
                          <p>{referral.isAccepted ? <span className=" text-green-500">Accepted</span> : <span className=" text-red-500">Pending</span>}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-semibold text-2xl">REFER SOMEONE NOW</h1>
          <form className="py-6 left-0 w-[300px] flex flex-col" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Input student name or ID number"
                style={inputStyle}
                onChange={handleStudentNameChange}
                value={value}
                required
              />
              <button className="text-xs text-white mb-4 cursor-pointer bg-secondary rounded-md p-1" onClick={handleClear}>
                clear
              </button>
            </div>
            <div>
              {showResultsDropdown && query && (
                <ul className="max-h-60 overflow-y-auto absolute w-full max-w-[300px] bg-white border border-gray-300 rounded-b-md">
                  {results.map((student) => (
                    <li
                      className=" w-full border p-1 cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:border-secondary"
                      key={student.id}
                      onClick={() => handleStudentInput(student.firstname + " " + student.lastname, students, setStudentId, setValue, setResults, setQuery)}
                    >
                      <p className="text-sm ">
                        {student.firstname} {student.lastname}
                      </p>
                      <p className="text-xs text-gray-300">Student ID: {student.studentID}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <select
              name="userType"
              required
              className="mb-3 text-gray-400 outline-none text-sm border-2 border-secondary rounded-md p-2"
              defaultValue="label"
              onChange={handleReasonChange}
            >
              <option disabled value="label" hidden>
                Reason/s for referrals
              </option>
              <option value="Sample 1">Reason 1</option>
              <option value="Sample 2">Reason 2</option>
              <option value="Sample 3">Reason 3</option>
              <option value="Other">Others, please specify</option>
            </select>
            {showOtherInput && <input type="text" placeholder="If other/s" style={inputStyle} onChange={handleOtherReasonChange} />}

            <button type="submit" className="bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
