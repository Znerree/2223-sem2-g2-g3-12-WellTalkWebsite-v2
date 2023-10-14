import React from "react";

type LoadingProps = {
  size: number;
};

export const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div className="w-full h-screen absolute flex items-center justify-center bg-gray-900 bg-opacity-70 z-10 gap-2">
      <div style={{ width: `${size}px`, height: `${size}px` }} className="animate-spin">
        <div
          className="h-full w-full border-4 border-t-primary
       border-b-primary rounded-[50%]"
        ></div>
      </div>
      <div>
        <h1 className=" text-white">Loading...</h1>
      </div>
    </div>
  );
};
