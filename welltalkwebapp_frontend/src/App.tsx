import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Calendar from "./pages/private-pages/Calendar";
import Register from "./pages/Register";
// import RequireAuth from "./components/RequireAuth";
import { Dashboard } from "./pages/private-pages/Dashboard";
import Inbox from "./pages/private-pages/Inbox";
import Students from "./pages/private-pages/Students";
import ContentOverview from "./pages/private-pages/ContentOverview";
import Forum from "./pages/private-pages/Forum";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import EmailChecker from "./pages/EmailChecker";
import { StudentReferral } from "./pages/private-pages/StudentReferral";
import SidebarNav from "./components/SidebarNav";
import LoggedinHeader from "./components/LoggedinHeader";
import CounselorNavs from "./components/CounselorNavs";

const routeToTitle: { [key: string]: string } = {
  "/": "Home",
  "/about": "About",
  "/login": "Login",
  "/register": "Create an Account",
  "/dashboard": "Dashboard",
  "/inbox": "Inbox",
  "/students": "Students",
  "/content-overview": "Content Overview",
  "/calendar": "Calendar",
  "/forum": "Forum",
  "/email-verification": "Email Verification",
  "/student-referral": "Student Referral",
};

type Props = {};

function App() {
  const location = useLocation();

  useEffect(() => {
    // Get the current route from the location
    const currentRoute = location.pathname;

    // Set the document title based on the current route
    document.title = `WellTalk |  ${
      routeToTitle[currentRoute] || "Page Not Found"
    }`;
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/email-verification" element={<EmailChecker />} />

          {/* private routes */}
          <Route path="/" element={<CounselorNavs />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/students" element={<Students />} />
            <Route path="/content-overview" element={<ContentOverview />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/forum" element={<Forum />} />
          </Route>
          <Route path="student-referral" element={<StudentReferral />} />
        </Route>

        {/* displayed when navigated to unknown endpoint */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Outlet />
    </>
  );
}

function PageNotFound() {
  return <h1>Page not found</h1>;
}

export default App;
