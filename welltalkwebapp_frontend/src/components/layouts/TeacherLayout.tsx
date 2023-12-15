import React from "react";
import LoggedInHeader from "../headers/LoggedInHeader";
import useGetCurrentPath from "@/hooks/useGetCurrentPath";
import { Outlet } from "react-router-dom";

const TeacherLayout = () => {
  const { currentPathName } = useGetCurrentPath();

  return (
    <div>
      <div>
        <LoggedInHeader currentPathName={currentPathName} />
      </div>
      <div className=" container my-10">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
