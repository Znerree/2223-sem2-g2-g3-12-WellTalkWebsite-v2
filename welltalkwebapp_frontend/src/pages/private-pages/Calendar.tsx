import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";
import ListOfAppointments from "@/components/Calendar/calendar-list-of-appointments";
import ReferredStudents from "@/components/Calendar/calendar-referred-students";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "@/api/axios";
import {HiSwitchHorizontal} from "react-icons/hi";

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
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [showAnnounceSchedule, setShowAnnounceSchedule] = useState(false);

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
    const filteredStudents = students.filter(
      (student) =>
        student.firstname.toLowerCase().includes(inputValue.toLowerCase()) ||
        student.lastname.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setResults(filteredStudents);
    console.log(value);

    // Show/hide the dropdown based on whether there are matching results
    setShowResultsDropdown(filteredStudents.length > 0);
  };

  const handleStudentInput = (studentName: string) => {
    console.log(value);
    setValue(studentName);
    setResults([]);
    setQuery("");
    // Clear the input field after selecting a student
    if (inputRef.current) {
      inputRef.current.value = studentName;
    }

    const selectedStudent = students.find(
      (student) => student.firstname + " " + student.lastname === studentName
    );
    if (selectedStudent) {
      setStudentId(selectedStudent.id.toString());
      console.log(selectedStudent.id);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(startDate);
  console.log(startTime);
  console.log(value);
  console.log(localStorage.getItem("counselorID"));

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    // Get the current date and time
    const currentDate = new Date();
    
    // Convert the selected date and time to a JavaScript Date object
    const selectedDate = new Date(`${startDate}T${startTime}`);
    
    // Check if the selected date and time is before the current date and time
    if (selectedDate < currentDate) {
      // Display an error message to the user
      alert("Appointment date and time must not be before the current date and time");
      setValue("");
      setQuery("");
      setResults([]);
      setStartDate("");
      setStartTime("");
      return; // Prevent further execution of the function
    }
    
    // If the selected date and time is valid, proceed with the appointment creation 
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    const appointmentData = {
      start_date: `${startDate}T${startTime}`,
    };
    const scheduleData = {
      dateTime: `${startDate}T${startTime}`,
    }
    if(showAnnounceSchedule){
      try {
        const response = await axios.post(
          "/availableschedules",
          scheduleData,
          config
        );
        console.log(response.data);
        alert("Schedule created successfully");
        setStartDate("");
        setStartTime("");
      } catch (error) {
        console.error("Error creating schedule:", error);
      }
    }else{
      try {
        const response = await axios.post(
          "/appointments?student=" + studentID,
          appointmentData,
          config
        );
        console.log(response.data);
        alert("Appointment set successfully");
        window.location.reload();
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };
  

  const handleSelectTime = (event: any) => {
    const time = event.target.value;
    console.log(time);
    let [hours, minutes] = time.split(":");
    let seconds = "00";
    if (time.includes("pm")) {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    setStartTime(`${hours}:${minutes}:${seconds}`);
  };

  

  return (
    <>
      <SidebarNav />
      <LoggedinHeader />
      <div className=" ml-72 flex gap-4 container-md pr-4">
        <h1 className=" font-semibold">Calendar</h1>
        <div className=" w-80 rounded-lg shadow-2xl mt-10 px-2 flex flex-col border pb-3">
          {/* Set an appointment */}
          <div className="flex items-center justify-between border-b sticky">
            <h1 className=" font-semibold text-md top-0 bg-white py-4 pl-2">
              {showAnnounceSchedule
                ? "Announce a Schedule"
                : "Set an Appointment"}
            </h1>

            <HiSwitchHorizontal 
              className="text-black-300 h-6 w-6 cursor-pointer"
              onClick={() => setShowAnnounceSchedule(!showAnnounceSchedule)} />
          </div>
          {showAnnounceSchedule ?    
          (<form className=" px-3 pt-3">
          <label className=" text-sm text-gray-400">Date</label>
          <input
            name="date"
            type="date"
            style={inputStyle}
            autoComplete="off"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className=" text-sm text-gray-400">Time</label>
          <input
            name="time"
            type="time"
            style={inputStyle}
            autoComplete="off"
            required
            value={startTime}
            onChange={handleSelectTime}
          />
          <button
            type="submit"
            className=" text-sm bg-tertiary rounded-lg p-2 text-white hover:shadow-sm hover:shadow-secondary"
            onClick={handleSubmit}
          >
            SET SCHEDULE
          </button>
        </form>)
          :
          (<form className=" px-3 pt-3">
          <div className="flex items-center">
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
              className="text-xs text-white mb-4 cursor-pointer bg-secondary rounded-md p-1 ml-2"
              onClick={handleClear}
            >
              clear
            </button>
          </div>
          {showResultsDropdown && query && (
            <ul className="max-h-60 overflow-y-auto absolute bg-white border border-gray-300 rounded-b-md">
              {results.map((student) => (
                <li
                  className=" w-full border p-2 cursor-pointer hover:bg-gray-100"
                  key={student.id}
                  onClick={() =>
                    handleStudentInput(
                      student.firstname + " " + student.lastname
                    )
                  }
                >
                  <p className="text-sm bold">
                    {student.firstname} {student.lastname}
                  </p>
                  <p className="text-xs text-red-500">
                    Student id: {student.studentID}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <label className=" text-sm text-gray-400">Date</label>
          <input
            name="date"
            type="date"
            style={inputStyle}
            autoComplete="off"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className=" text-sm text-gray-400">Time</label>
          <input
            name="time"
            type="time"
            style={inputStyle}
            autoComplete="off"
            required
            value={startTime}
            onChange={handleSelectTime}
          />
          <button
            type="submit"
            className=" text-sm bg-tertiary rounded-lg p-2 text-white hover:shadow-sm hover:shadow-secondary"
            onClick={handleSubmit}
          >
            SET APPOINTMENT
          </button>
        </form>)}
        </div>

        {/* List of appointments */}
        <div className=" max-h-[400px] w-80  overflow-y-auto rounded-lg shadow-2xl mt-10 px-2 flex flex-col border">
          <ListOfAppointments />
        </div>

        {/* Referred students */}
        <div className="max-h-[400px] overflow-y-auto w-[400px] rounded-lg shadow-2xl mt-10 px-2 flex flex-col border bg-white scroll-smooth">
          <ReferredStudents />
        </div>
      </div>
    </>
  );
};

export default Calendar;
