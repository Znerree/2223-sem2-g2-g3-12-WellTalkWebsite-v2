import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";

export const StudentReferral = () => {
  return (
    <>
      <SidebarNav />
      <LoggedinHeader />
      <div className="ml-72">
        <h1 className="font-semibold">Student Referral</h1>
      </div>
    </>
  );
};
