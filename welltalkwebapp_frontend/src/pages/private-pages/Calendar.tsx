import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";
import ListOfAppointments from "@/components/Calendar/calendar-list-of-appointments";
import ReferredStudents from "@/components/Calendar/calendar-referred-students";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "@/api/axios";

type Student = {
  id: number;
  firstname: string;
  lastname: string;
  studentID: number;
  email: string;
  year: number;
  department: string;
};

const Calendar = () => {
  //css style for input
  const inputStyle = {
    borderBottom: "2px solid #769EAB",
    background: "transparent",
    outline: "none",
    width: "100%",
    height: "40px",
    padding: "3px 3px",
    marginBottom: "16px",
    border: "1px solid #769EAB",
    borderRadius: "5px",
  };

  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [studentID, setStudentId] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("students");
      setStudents(response.data);
      console.log(response.data);
    };
    fetchStudents();
  }, []);

  const handleClear = () => {
    setValue("");
    setQuery("");
    setResults([]);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setQuery(inputValue);
    const filteredStudents = students.filter((student) =>
      student.firstname.toLowerCase().includes(inputValue.toLowerCase()) ||
      student.lastname.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setResults(filteredStudents);
    console.log(value);

    // Show/hide the dropdown based on whether there are matching results
    setShowResultsDropdown(filteredStudents.length > 0);
  };

  const handleStudentInput = (studentName: string) => {
    console.log(value)
    setValue(studentName);
    setResults([]);
    setQuery("");
    // Clear the input field after selecting a student
    if (inputRef.current) {
      inputRef.current.value = studentName;
    }

    const selectedStudent = students.find((student) => student.firstname + " " + student.lastname === studentName);
    if(selectedStudent){
      setStudentId(selectedStudent.id.toString());
      console.log(selectedStudent.id)
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <SidebarNav />
      <LoggedinHeader />
      <div className=" ml-72 flex gap-4 container-md pr-4">
        <h1 className=" font-semibold">Calendar</h1>
        <div className=" w-80 rounded-lg shadow mt-10 px-2 flex flex-col border pb-3">
          {/* Set an appointment */}
          <h1 className=" font-semibold text-md border-b sticky top-0 bg-white py-4 pl-2">
            Set an Appointment
          </h1>
          <form className=" px-3 pt-3">
          <div className="flex items-center justify-center relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Student name"
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
          <div>
          {showResultsDropdown && query && (
            <ul className="max-h-60 overflow-y-auto absolute w-full max-w-[300px] bg-white border border-gray-300 rounded-b-md">
              {results.map((student) => (
                <li
                  className=" w-full border p-1 cursor-pointer hover:bg-gray-100"
                  key={student.id}
                  onClick={() => handleStudentInput(student.firstname + " " + student.lastname)}
                >
                  <p className="text-sm ">{student.firstname} {student.lastname}</p>
                  <p className="text-xs text-gray-300">
                    Student id: {student.studentID}
                  </p>
                </li>
              ))}
            </ul>
          )}
          </div>
            <label className=" text-sm text-gray-400">Date</label>
            <input
              name="date"
              type="date"
              style={inputStyle}
              autoComplete="off"
              required
            />
            <label className=" text-sm text-gray-400">Time</label>
            <input
              name="time"
              type="time"
              style={inputStyle}
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className=" bg-secondary rounded-lg p-2 text-white hover:shadow-sm hover:shadow-secondary"
            >
              Set Appointment
            </button>
          </form>
        </div>

        {/* List of appointments */}
        <div className=" w-80 rounded-lg shadow mt-10 px-2 flex flex-col border">
          <ListOfAppointments />
        </div>

        {/* Referred students */}
        <div className="max-h-[400px] overflow-y-auto w-[400px] rounded-lg shadow mt-10 px-2 flex flex-col border bg-white scroll-smooth">
          <ReferredStudents />
        </div>
      </div>
    </>
  );
};

export default Calendar;
