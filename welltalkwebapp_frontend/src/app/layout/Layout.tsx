import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarNav from "../../components/sidebar/SidebarNav";
import HeroHeader from "../../components/headers/LandingHeader";
import LoggedInHeader from "../../components/headers/LoggedInHeader";
import useGetCurrentPath from "@/hooks/useGetCurrentPath";
import Footer from "../../components/footer/Footer";
import { Button } from "../../components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { ProgressBar } from "../../components/Loaders";
import useLoading from "@/hooks/useLoading";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentPathName } = useGetCurrentPath();
  const { loading } = useLoading();

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {!loading && (
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

          <div className=" flex flex-col w-full overflow-auto scroll-smooth ">
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
      )}
    </>
  );
};

export default Layout;
