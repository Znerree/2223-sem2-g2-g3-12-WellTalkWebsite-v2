import LoggedinHeader from "@/components/LoggedinHeader";
import SidebarNav from "@/components/SidebarNav";
import React from "react";

const ContentOverview = () => {
  return (
    <>
      <SidebarNav />
      <LoggedinHeader />
      <div className=" ml-72">
        <h1 className=" font-semibold">Content Overview</h1>
      </div>
    </>
  );
};

export default ContentOverview;
