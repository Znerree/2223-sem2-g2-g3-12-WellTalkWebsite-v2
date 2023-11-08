import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import HeroHeader from "./HeroHeader";
import LoggedInHeader from "./LoggedInHeader";
import useGetCurrentPath from "@/hooks/useGetCurrentPath";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { MdOutlineClose } from "react-icons/md";
import { ProgressBar } from "./Loaders";
import useLoading from "@/hooks/useLoading";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentPathName } = useGetCurrentPath();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const { loading } = useLoading();

  return (
    <>
      <div className="h-screen flex ">
        <aside className=" hidden md:flex">
          <SidebarNav />
        </aside>

        {showSidebar ? (
          <div className=" w-full absolute bg-gray-900 bg-opacity-70 z-50 lg:hidden">
            <Button variant="ghost" size={"icon"} onClick={handleShowSidebar} className=" fixed left-64 text-white">
              <MdOutlineClose />
            </Button>
            <SidebarNav />
          </div>
        ) : null}

        <div className=" flex flex-col w-full overflow-auto scroll-smooth bg-gray-100">
          <header className=" sticky top-0 z-10">
            <LoggedInHeader
              currentPathName={currentPathName}
              showSidebar={() => {
                handleShowSidebar();
              }}
            />
          </header>

          <main className=" h-full p-3 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
