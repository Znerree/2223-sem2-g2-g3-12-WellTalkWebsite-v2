import useLoading from "@/hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import CounselorHeader from "./CounselorHeader";
import ReferralHeader from "./ReferralHeader";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import { ProgressBar } from "./Loading";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { loading, setLoading } = useLoading();
  const location = useLocation(); // React Router's useLocation
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

  return (
    <div className="h-screen flex">
      {isLoggedIn && userType === "Counselor" && isCounselorRoutes && <SidebarNav />}
      <div className="w-full overflow-y-auto flex flex-col bg-gray-50">
        <header className="sticky top-0">
          {loading && <ProgressBar />}
          {isLandingPage && <LandingHeader />}
          {isTeacherRoutes && userType === "Teacher" && <ReferralHeader />}
          {isCounselorRoutes && userType === "Counselor" && <CounselorHeader />}
        </header>
        <main className={`${isPrivatePages ? "px-5 py-3" : "h-full"}`}>{children}</main>
        <footer className="sticky bottom-0">{isLandingPage && <Footer />}</footer>
      </div>
    </div>
  );
};

export default Layout;
