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
import { FaArrowUp } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { loading, setLoading } = useLoading();
  const location = useLocation(); // React Router's useLocation

  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 100 ? setShowScrollButton(true) : setShowScrollButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);
    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isMobileView && isLoggedIn && userType === "Counselor" && isCounselorRoutes && (
        <button
          className="fixed top-4 mx-3 z-10 rounded-md text-tertiary text-opacity-70 hover:text-tertiary p-2 hover:bg-gray-200"
          onClick={handleToggleSidebar}
        >
          <RxHamburgerMenu />
        </button>
      )}
      {isLoggedIn && userType === "Counselor" && isCounselorRoutes && (
        <div className={`bg-tertiary h-screen sticky top-0 p-4 flex${isMobileView ? " hidden" : ""}`}>
          <span className=" w-64">
            <SidebarNav />
          </span>
        </div>
      )}
      <div className=" bg-gray-50 w-full flex flex-col">
        <header className="sticky top-0">
          {loading && <ProgressBar />}
          {isLandingPage && <LandingHeader />}
          {isTeacherRoutes && userType === "Teacher" && <ReferralHeader />}
          {isCounselorRoutes && userType === "Counselor" && <CounselorHeader />}
        </header>
        {isSidebarOpen && isMobileView && isLoggedIn && userType === "Counselor" && isCounselorRoutes && (
          <div className="w-full fixed z-10 bg-gray-900 bg-opacity-70" onClick={() => setIsSidebarOpen(false)}>
            <div className=" w-1/2 p-4 bg-tertiary shadow" onClick={(event) => event.stopPropagation()}>
              <SidebarNav />
            </div>
          </div>
        )}
        <main className={`${isPrivatePages ? " overflow-y-auto h-full py-2" : "h-full"}`}>{children}</main>
        {isLandingPage && <Footer />}
        {showScrollButton && (
          <div className="fixed right-2 bottom-10 flex flex-col items-center">
            <button className=" bg-tertiary text-white rounded-full p-1" onClick={handleScrollToTop}>
              <FaArrowUp />
            </button>
            <p className={`text-xs text-gray-400 ${isMobileView ? " w-10 text-center" : ""}`}>Scroll to top</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
