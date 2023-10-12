import ListOfAppointments from "@/components/Calendar/calendar-list-of-appointments";
import ReferredStudents from "@/components/Calendar/calendar-referred-students";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import useStudentSearch from "@/actions/search-student-actions";
import useAppointmentActions from "@/actions/calendar-appointment-actions";

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

  const { startDate, setStartDate, startTime, showAnnounceSchedule, setShowAnnounceSchedule, handleSubmit, handleSelectTime, clearForm } =
    useAppointmentActions();

  const handleStudentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(event, students, setResults, setShowResultsDropdown, setValue, setQuery);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className=" ml-72 top-20 absolute flex gap-8 mr-4">
        <h1 className=" font-semibold">Calendar</h1>
        <div className=" w-80 rounded-lg shadow-2xl mt-10 flex flex-col border pb-3 px-2">
          {/* Set an appointment */}
          <div className="flex items-center justify-between border-b sticky">
            <h1 className=" font-semibold text-md top-0 bg-white py-4 pl-2">{showAnnounceSchedule ? "Announce a Schedule" : "Set an Appointment"}</h1>

            <HiSwitchHorizontal className="text-black-300 h-6 w-6 cursor-pointer" onClick={() => setShowAnnounceSchedule(!showAnnounceSchedule)} />
          </div>
          {showAnnounceSchedule ? (
            <form className=" px-3 pt-3">
              <label className=" text-sm text-gray-400">Date</label>
              <input name="date" type="date" style={inputStyle} autoComplete="off" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label className=" text-sm text-gray-400">Time</label>
              <input name="time" type="time" style={inputStyle} autoComplete="off" required value={startTime} onChange={handleSelectTime} />
              <button
                type="submit"
                className=" text-sm bg-tertiary rounded-lg p-2 text-white hover:shadow-sm hover:shadow-secondary"
                onClick={() => handleSubmit(studentID, showAnnounceSchedule)}
              >
                SET SCHEDULE
              </button>
            </form>
          ) : (
            <form className=" px-3 pt-3">
              <div className="flex items-center">
                <input ref={inputRef} type="text" placeholder="Student name" style={inputStyle} onChange={handleStudentNameChange} value={value} required />
                <button className="text-xs text-white mb-4 cursor-pointer bg-secondary rounded-md p-1 ml-2" onClick={handleClear}>
                  clear
                </button>
              </div>
              {showResultsDropdown && query && (
                <ul className="max-h-60 overflow-y-auto absolute w-full max-w-[250px] bg-white border border-gray-300 rounded-b-md">
                  {results.map((student) => (
                    <li
                      className=" w-full border p-2 cursor-pointer hover:bg-gray-100"
                      key={student.id}
                      onClick={() => handleStudentInput(student.firstname + " " + student.lastname, students, setStudentId, setValue, setResults, setQuery)}
                    >
                      <p className="text-sm bold">
                        {student.firstname} {student.lastname}
                      </p>
                      <p className="text-xs text-red-500">Student id: {student.studentID}</p>
                    </li>
                  ))}
                </ul>
              )}
              <label className=" text-sm text-gray-400">Date</label>
              <input name="date" type="date" style={inputStyle} autoComplete="off" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label className=" text-sm text-gray-400">Time</label>
              <input name="time" type="time" style={inputStyle} autoComplete="off" required value={startTime} onChange={handleSelectTime} />
              <button
                type="submit"
                className=" text-sm bg-tertiary rounded-lg p-2 text-white hover:shadow-sm hover:shadow-secondary"
                onClick={() => handleSubmit(studentID, showAnnounceSchedule)}
              >
                SET APPOINTMENT
              </button>
            </form>
          )}
        </div>

        {/* List of appointments */}
        <div className=" max-h-[400px] w-80  overflow-y-auto rounded-lg shadow-2xl mt-10 px-2 flex flex-col border">
          <ListOfAppointments />
        </div>

        {/* Referred students */}
        <div className="max-h-[400px] w-[400px] overflow-y-auto rounded-lg shadow-2xl mt-10 px-2 flex flex-col border bg-white scroll-smooth">
          <ReferredStudents />
        </div>
      </div>
    </>
  );
};

export default Calendar;
