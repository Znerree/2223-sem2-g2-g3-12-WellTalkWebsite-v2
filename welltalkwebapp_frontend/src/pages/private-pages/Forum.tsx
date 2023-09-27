import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";

const Forum = () => {
  return (
    <>
      <SidebarNav />
      <LoggedinHeader />
      <div className=" ml-72">
        <h1 className=" font-semibold">Forum</h1>
      </div>
    </>
  );
};
export default Forum;
