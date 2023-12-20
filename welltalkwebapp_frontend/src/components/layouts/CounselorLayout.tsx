import { useState } from "react";
import SidebarNav from "../sidebar/SidebarNav";
import LoggedInHeader from "../headers/LoggedInHeader";
import useGetCurrentPath from "@/hooks/useGetCurrentPath";
import { Button } from "../ui/button";
import { MdOutlineClose } from "react-icons/md";
import useLoading from "@/hooks/useLoading";
import { Outlet } from "react-router-dom";

const CounselorLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentPathName } = useGetCurrentPath();
  const { loading } = useLoading();

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {!loading && (
        <div className="h-screen flex bg-slate-50">
          {!showSidebar && (
            <aside className=" md:flex hidden">
              <SidebarNav />
            </aside>
          )}

          <div className=" flex flex-col w-full overflow-auto scroll-smooth ">
            <header className=" sticky top-0 z-10">
              <LoggedInHeader
                currentPathName={currentPathName}
                showSidebar={() => {
                  handleShowSidebar();
                }}
              />
            </header>

            <main className=" my-3">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default CounselorLayout;
