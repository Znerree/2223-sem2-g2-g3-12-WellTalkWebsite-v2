import { useState } from "react";
import axios from "@/api/axios";

// Custom hook for handling appointment actions
const useAppointmentActions = () => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [showAnnounceSchedule, setShowAnnounceSchedule] = useState(false);
  const [showAppoinmentRequests, setShowAppoinmentRequests] = useState(false);

  const handleSubmit = async (studentID: string, isSchedule: boolean) => {
    // Get the current date and time
    const currentDate = new Date();

    // Convert the selected date and time to a JavaScript Date object
    const selectedDate = new Date(`${startDate}T${startTime}`);

    // Check if the selected date and time is before the current date and time
    if (selectedDate < currentDate) {
      // Display an error message to the user
      alert("Appointment date and time must not be before the current date and time");
      clearForm();
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
    };

    try {
      if (isSchedule) {
        const response = await axios.post("/availableschedules", scheduleData, config);
        console.log(response.data);
        alert("Schedule created successfully");
      } else {
        const response = await axios.post("/appointments?student=" + studentID, appointmentData, config);
        console.log(response.data);
        alert("Appointment set successfully");
        window.location.reload();
      }
      clearForm();
    } catch (error) {
      console.error(isSchedule ? "Error creating schedule:" : "Error creating appointment:", error);
    }
  };

  const handleSelectTime = (event: any) => {
    const time = event.target.value;
    let [hours, minutes] = time.split(":");
    let seconds = "00";
    if (time.includes("pm")) {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    setStartTime(`${hours}:${minutes}:${seconds}`);
  };

  const clearForm = () => {
    setStartDate("");
    setStartTime("");
  };

  return {
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    showAnnounceSchedule,
    setShowAnnounceSchedule,
    showAppoinmentRequests,
    setShowAppoinmentRequests,
    handleSubmit,
    handleSelectTime,
    clearForm,
  };
};

export default useAppointmentActions;
