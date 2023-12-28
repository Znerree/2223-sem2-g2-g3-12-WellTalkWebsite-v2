import { useState, useEffect } from "react";
import { IoLogOut, IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { BiSolidDashboard, BiSolidCalendar } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaNoteSticky } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AvatarInitials from "../ui/avatar-initials";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import useLoading from "@/hooks/useLoading";

type Props = {
  isSidebarOpen?: boolean;
};

const SidebarNav = ({ isSidebarOpen }: Props) => {
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
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { logout } = useAuth();

  const handleLogout = () => {
    setLoading(true);
    logout();
    if (localStorage.getItem("token") === null) {
      window.location.reload();
    }
    setLoading(false);
  };

  const initials = user ? user?.firstName.charAt(0) + user?.lastName.charAt(0) : "";

  if (localStorage.getItem("userType") !== "Counselor") {
    return null;
  }

  return (
    <section className="flex flex-col gap-2 bg-primary-700 px-4 py-4 h-screen w-64 animate-in">
      <div className="flex justify-between items-center">
        <div className="text-red-500 text-2xl font-semibold">
          <IoNotifications />
        </div>
        <div className="text-slate-700 text-2xl font-semibold">
          <IoSettingsSharp />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <AvatarInitials name={initials} className=" h-28 w-28 bg-slate-300 text-2xl font-bold" />
        <h1 className="text-white text-lg font-semibold">{user ? `${user.firstName} ${user.lastName}` : "Loading..."}</h1>
        <span className="text-slate-50 text-sm">{user ? user.userType : "Loading..."}</span>
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
      <AlertDialog>
        <AlertDialogTrigger className="text-gray-50 cursor-pointer text-lg flex items-center gap-3 rounded-md p-3 hover:bg-red-500">
          <IoLogOut />
          Logout
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription> All your unsaved changes will be lost. </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={"destructive"} onClick={handleLogout}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default SidebarNav;
