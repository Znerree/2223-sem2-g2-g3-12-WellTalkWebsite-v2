import axios, { axiosPrivate } from "@/api/axios";
import ReferralHeader from "@/components/ReferralHeader";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  year: number;
  department: string;
};

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

  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [referrer, setReferrer] = useState("");
  const [studentID, setStudentId] = useState("");
  const [reason, setReason] = useState("")
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Student[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("students");
      setStudents(response.data);
      console.log(response.data);
    };
    fetchStudents();
  }, []);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setQuery(inputValue);
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredStudents);
    console.log(value);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStudentInput = (studentName: string) => {
    console.log(value)
    setValue(studentName);
    setResults([]);
    setQuery("");
    // Clear the input field after selecting a student
    if (inputRef.current) {
      inputRef.current.value = studentName;
    }

    const selectedStudent = students.find((student) => student.name === studentName);
    if(selectedStudent){
      setStudentId(selectedStudent.id.toString());
      console.log(selectedStudent.id)
    }
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleClear = () => {
    setValue("");
    setQuery("");
    setResults([]);
  };

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
    console.log(otherReason)
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:8080/users/username/${username}`);
        setReferrer(response.data.id);//sets the referrer/teacher ID value
        console.log(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:8080/referrals?student='+ studentID +'&teacher='+ referrer, {reason: reason});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
      <ReferralHeader />
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <h1 className="font-semibold text-2xl">REFER SOMEONE NOW</h1>
        <form className="py-6 left-0 w-[300px] flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Input student name or ID number"
              style={inputStyle}
              onChange={handleQueryChange}
              value={value}
              required
            />
            <button
              className="text-xs text-white mb-4 cursor-pointer bg-secondary rounded-md p-1"
              onClick={handleClear}
            >
              clear
            </button>
          </div>
          {query && results.length > 0 && (
            <ul className=" w-full">
              {results.map((student) => (
                <li
                  className=" w-full border p-1 cursor-pointer hover:bg-gray-100"
                  key={student.id}
                  onClick={() => handleStudentInput(student.name)}
                >
                  <p className="text-sm ">{student.name}</p>
                  <p className="text-xs text-gray-300">
                    Student id: {student.id}
                  </p>
                </li>
              ))}
            </ul>
          )}
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
          {showOtherInput && (
            <input type="text" placeholder="If other/s" style={inputStyle} onChange={handleOtherReasonChange}/>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};
