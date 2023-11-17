import React from "react";
import { Button } from "../ui/button";

const LandingContentBottom = () => {
  return (
    <section className=" py-10 flex space-x-2 items-center">
      <Button size="lg" className=" shadow bg-gradient-to-r from-primary-500 to-primary-300 hover:to-primary-500 font-bold ">
        Get mobile app
      </Button>
      <h1 className=" font-semibold text-xs text-primary-700">For students.</h1>
    </section>
  );
};

export default LandingContentBottom;
