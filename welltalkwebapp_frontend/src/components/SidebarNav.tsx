import { useState, useEffect, useRef } from "react";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { BiSolidDashboard, BiSolidCalendar } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaNoteSticky } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { AiOutlineSearch, AiFillAlert } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SidebarNav = () => {
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

  useEffect(() => {
    const activeIndex = navs.findIndex((nav) => nav.path === location.pathname);
    setActive(activeIndex);
  }, [location]);

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(`/users/username/${username}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    window.location.href = "/login";
  }

  return (
    <>
      <div className="flex">
        <div className=" w-64 h-screen py-8 p-5 bg-tertiary">
          <div className="flex justify-between">
            <IoNotifications className="text-red-400 h-6 w-6" />
            <IoSettingsSharp className="text-gray-300 h-6 w-6" />
          </div>
          <div className=" text-center my-3">
            <h1 className=" font-bold text-xl text-primary">
              {user.firstName} {user.lastName}
            </h1>
            <h3 className=" text-sm text-gray-300">{user.userType}</h3>
          </div>
          <ul className=" text-gray-300 text-lg my-6">
            {navs.map((nav, index) => (
              <Link
                to={nav.path}
                className={
                  active == index
                    ? " text-gray-50 font-semibold cursor-pointer flex items-center gap-3 rounded-md p-3 my-2 bg-primary bg-opacity-20"
                    : "cursor-pointer flex items-center gap-3 rounded-md p-3 my-2 hover:bg-primary hover:bg-opacity-20"
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
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SidebarNav;
