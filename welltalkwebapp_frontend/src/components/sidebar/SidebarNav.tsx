import { useState, useEffect } from "react";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { BiSolidDashboard, BiSolidCalendar } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaNoteSticky } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import useLoading from "@/hooks/useLoading";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";

type Props = {
  navIsClicked?: boolean;
};

const SidebarNav = ({ navIsClicked }: Props) => {
  //sidebar navs (names, icons, paths)
  let navs = [
    {
      icon: <FaHome />,
      name: "Home",
      path: "/home",
    },
    { icon: <BiSolidDashboard />, name: "Dashboard", path: "/dashboard" },
    { icon: <BsPeopleFill />, name: "Students", path: "/students-list" },
    { icon: <BiSolidCalendar />, name: "Calendar", path: "/calendar" },
    { icon: <FaNoteSticky />, name: "Notes", path: "/my-notes" },
  ];

  const location = useLocation();
  //useState for active nav using index of navs array
  const [active, setActive] = useState(0 || navs.findIndex((nav) => nav.path == location.pathname));
  const { user } = useAuth();
  const { loading } = useLoading();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (location.pathname == "/student-referral") {
    return null;
  }

  return (
    <>
      <section className="flex flex-col gap-2 bg-primary-700 px-4 py-4 h-screen w-64 animate-in">
        <div className="flex justify-between items-center">
          <div className="text-red-400 text-2xl font-semibold">
            <IoNotifications />
          </div>
          <div className="text-slate-500 text-2xl font-semibold">
            <IoSettingsSharp />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/300" className=" rounded-full h-36 w-36" loading="lazy" />
          </Avatar>
          <h1 className="text-white text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h1>
          <span className="text-primary-100 text-sm">{user.userType}</span>
        </div>
        {navs.map((nav, index) => (
          <Link
            to={nav.path}
            className={
              active == index
                ? "text-white font-semibold text-lg cursor-pointer flex items-center gap-3 rounded-md p-3 bg-primary-500 "
                : "text-gray-50 cursor-pointer text-lg flex items-center gap-3 rounded-md p-3 hover:bg-primary-500"
            }
            key={index}
            onClick={() => {
              setActive(index);
            }}
          >
            {nav.icon}
            {nav.name}
          </Link>
        ))}
        <div className="text-gray-50 cursor-pointer text-lg flex items-center gap-3 rounded-md p-3 hover:bg-red-500" onClick={handleLogout}>
          <IoLogOut />
          Logout
        </div>
      </section>
    </>
  );
};

export default SidebarNav;
