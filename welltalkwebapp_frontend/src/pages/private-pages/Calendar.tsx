import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";
import React from "react";

const Calendar = () => {
  return (
    <>
      <SidebarNav />
      <LoggedinHeader />
      <div className=" ml-72">
        <h1 className=" font-semibold">Calendar</h1>
      </div>
    </>
  );
};

export default Calendar;
