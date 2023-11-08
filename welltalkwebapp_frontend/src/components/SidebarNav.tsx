import { useState, useEffect } from "react";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { BiSolidDashboard, BiSolidCalendar } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaNoteSticky } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useFetchUser from "@/hooks/useFetchUser";
import { useAuth } from "@/contexts/AuthContext";

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
  const [active, setActive] = useState(0);

  const { user } = useFetchUser();
  const { logout } = useAuth();

  useEffect(() => {
    const activeIndex = navs.findIndex((nav) => nav.path === location.pathname);

    setActive(activeIndex);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  const userNameInitials = `${user?.firstName[0]}${user?.lastName[0]}`;

  return (
    <>
      <div className="flex flex-col gap-2 bg-tertiary px-4 py-4 h-screen w-64">
        <div className="flex justify-between items-center">
          <div className="text-red-400 text-2xl font-semibold">
            <IoNotifications />
          </div>
          <div className="text-gray-400 text-2xl font-semibold">
            <IoSettingsSharp />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="text-white text-lg font-semibold h-20 w-20 bg-gray-300 px-3 flex items-center justify-center rounded-full">{userNameInitials}</div>
          <h1 className="text-primary text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h1>
          <span className="text-gray-400 text-sm">{user?.userType}</span>
        </div>
        {navs.map((nav, index) => (
          <Link
            to={nav.path}
            className={
              active == index
                ? "text-white font-semibold text-xl cursor-pointer flex items-center gap-3 rounded-md p-3 bg-primary bg-opacity-20"
                : "text-gray-50 cursor-pointer text-lg flex items-center gap-3 rounded-md p-3 hover:bg-primary hover:bg-opacity-20"
            }
            key={index}
            onClick={() => {
              setActive(index);
              navIsClicked = true;
            }}
          >
            {nav.icon}
            {nav.name}
          </Link>
        ))}
        <div className="text-gray-50 cursor-pointer text-lg flex items-center gap-3 rounded-md p-3 hover:bg-primary hover:bg-opacity-20" onClick={handleLogout}>
          <IoLogOut />
          Logout
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
