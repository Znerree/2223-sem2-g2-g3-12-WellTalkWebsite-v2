import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";

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
