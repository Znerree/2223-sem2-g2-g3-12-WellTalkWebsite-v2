import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";
import ListOfAppointments from "@/components/Calendar/calendar-list-of-appointments";
import ReferredStudents from "@/components/Calendar/calendar-referred-students";

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
            <input
              name="studentName"
              type="text"
              style={inputStyle}
              placeholder="Student name"
              autoComplete="off"
              required
            />
            <input
              name="studentID"
              type="number"
              style={inputStyle}
              placeholder="Student ID number"
              autoComplete="off"
              required
            />
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
