import { useState, useEffect } from "react";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import {
  BiSolidDashboard,
  BiSolidInbox,
  BiSolidBookContent,
  BiSolidCalendar,
} from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaPeopleArrows } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

const SidebarNav = () => {
  //sidebar navs (names, icons, paths)
  let navs = [
    { icon: <BiSolidDashboard />, name: "Dashboard", path: "/dashboard" },
    { icon: <BiSolidInbox />, name: "Inbox", path: "/inbox" },
    { icon: <BsPeopleFill />, name: "Students", path: "/students" },
    {
      icon: <BiSolidBookContent />,
      name: "Content Overview",
      path: "/content-overview",
    },
    { icon: <BiSolidCalendar />, name: "Calendar", path: "/calendar" },
    { icon: <MdForum />, name: "Forum", path: "/forum" },
  ];

  const location = useLocation();
  //useState for active nav using index of navs array
  const [active, setActive] = useState(0);

  useEffect(() => {
    const activeIndex = navs.findIndex((nav) => nav.path === location.pathname);
    setActive(activeIndex);
  }, [location]);

  return (
    <nav className="h-screen absolute w-64 bg-white border-r shadow">
      <div className=" px-4 py-5 items-center">
        <div className="flex justify-between h-full top-0">
          <IoNotifications className="text-secondary h-6 w-6" />
          <IoSettingsSharp className="text-secondary h-6 w-6" />
        </div>
        <div className=" text-center my-3">
          <h1 className=" font-bold text-xl text-primary">John Doe</h1>
          <h3 className=" text-sm text-gray-300"> Counselor </h3>
        </div>
        <ul className=" text-secondary text-lg my-6">
          {navs.map((nav, index) => (
            <Link
              to={nav.path}
              className={
                active == index
                  ? " text-primary font-semibold cursor-pointer flex items-center gap-3 rounded-md p-3 my-2 bg-primary bg-opacity-20"
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
    </nav>
  );
};

export default SidebarNav;
