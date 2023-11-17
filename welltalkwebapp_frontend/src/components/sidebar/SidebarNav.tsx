import { useState, useEffect } from "react";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { BiSolidDashboard, BiSolidCalendar } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaNoteSticky } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useFetchUser from "@/hooks/useFetchUser";
import { useAuth } from "@/contexts/AuthContext";
import axios from "@/api/axios";
import { User } from "@/types/user";
import useLoading from "@/hooks/useLoading";
import useGetCurrentPath from "@/hooks/useGetCurrentPath";

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
    { icon: <BsPeopleFill />, name: "Students", path: "/students" },
    { icon: <BiSolidCalendar />, name: "Calendar", path: "/calendar" },
    { icon: <FaNoteSticky />, name: "Notes", path: "/notes" },
  ];

  const location = useLocation();
  //useState for active nav using index of navs array
  const [active, setActive] = useState(0 || navs.findIndex((nav) => nav.path == location.pathname));
  const { user } = useFetchUser();
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
      <section className="flex flex-col gap-2 bg-tertiary px-4 py-4 h-screen w-64">
        <div className="flex justify-between items-center">
          <div className="text-red-400 text-2xl font-semibold">
            <IoNotifications />
          </div>
          <div className="text-gray-400 text-2xl font-semibold">
            <IoSettingsSharp />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="text-white text-lg font-semibold h-20 w-20 bg-gray-300 px-3 flex items-center justify-center rounded-full">
            {!loading && <> {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}</>}
          </div>
          <h1 className="text-primary-500 text-lg font-semibold">{!loading && <>{`${user?.firstName} ${user?.lastName}`}</>}</h1>
          <span className="text-gray-400 text-sm">{user?.userType}</span>
        </div>
        {navs.map((nav, index) => (
          <Link
            to={nav.path}
            className={
              active == index
                ? "text-white font-semibold text-xl cursor-pointer flex items-center gap-3 rounded-md p-3 bg-primary-600 "
                : "text-gray-50 cursor-pointer text-lg flex items-center gap-3 rounded-md p-3 hover:bg-primary-600"
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
