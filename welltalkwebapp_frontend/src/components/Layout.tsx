import useLoading from "@/hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import CounselorHeader from "./CounselorHeader";
import ReferralHeader from "./ReferralHeader";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import { ProgressBar } from "./Loading";
import { RxHamburgerMenu } from "react-icons/rx";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { loading, setLoading } = useLoading();
  const location = useLocation(); // React Router's useLocation

  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const isTeacherRoutes = location.pathname === "/student-referral";
  const isCounselorRoutes =
    location.pathname === "/home" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/students" ||
    location.pathname === "/calendar" ||
    location.pathname === "/notes";
  const isLandingPage = location.pathname === "/" || location.pathname === "/about";

  const isPrivatePages = isTeacherRoutes || isCounselorRoutes;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Initial check for screen size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`h-screen flex ${isMobileView ? "flex flex-col" : ""}`}>
      {isMobileView && isLoggedIn && userType === "Counselor" && isCounselorRoutes && (
        <button className="fixed top-0 w-16 h-16 z-50 ml-3 text-tertiary text-opacity-70 hover:text-tertiary" onClick={handleToggleSidebar}>
          <RxHamburgerMenu />
        </button>
      )}
      {isLoggedIn && userType === "Counselor" && isCounselorRoutes && (
        <div className={`bg-tertiary p-4 flex${isMobileView ? " hidden" : ""}`}>
          <span className=" w-64">
            <SidebarNav />
          </span>
        </div>
      )}
      <div className="overflow-y-auto bg-gray-50 w-full h-full">
        <header className="sticky top-0">
          {loading && <ProgressBar />}
          {isLandingPage && <LandingHeader />}
          {isTeacherRoutes && userType === "Teacher" && <ReferralHeader />}
          {isCounselorRoutes && userType === "Counselor" && <CounselorHeader />}
        </header>
        {isSidebarOpen && isMobileView && isLoggedIn && userType === "Counselor" && isCounselorRoutes && (
          <div className=" h-full p-4 bg-tertiary rounded-lg m-3 shadow">
            <SidebarNav />
          </div>
        )}
        <main className={`${isPrivatePages ? "container py-2" : "h-full"}`}>{children}</main>
        {isLandingPage && <footer className="sticky bottom-0">{isLandingPage && <Footer />}</footer>}
      </div>
    </div>
  );
};

export default Layout;
