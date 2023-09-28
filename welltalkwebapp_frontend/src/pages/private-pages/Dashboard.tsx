import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";
export const Dashboard = () => {

  return (
    <>
      <SidebarNav/>
      <LoggedinHeader />
      <div className="ml-72">
        <h1 className="font-semibold">Dashboard</h1>
      </div>
    </>
  );
};
