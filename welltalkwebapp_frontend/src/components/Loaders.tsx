import { useAuth } from "@/contexts/AuthContext";
import useFetchUser from "@/hooks/useFetchUser";
import useLoading from "@/hooks/useLoading";
import { get } from "http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProgressBar = () => {
  const { loading, setLoading } = useLoading();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const handleLoadingComplete = () => {
      setLoading(true);
      setLoadingComplete(true);
    };
    handleLoadingComplete();
  }, [loading]);

  return (
    <div className="fixed h-screen w-full">
      <div className="relative h-[3px] w-full bg-neutral-200 dark:bg-neutral-600">
        <div className={`absolute top-0 left-0 h-full bg-primary transition-width duration-1000 ease-in-out ${loadingComplete ? "w-full" : "w-2"}`}></div>
      </div>
    </div>
  );
};

// Loading Screen
export const LoadingScreen = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const isLoggedin = localStorage.getItem("token");
  const isCounselor = localStorage.getItem("userType") === "Counselor" ? true : false;

  if (isLoggedin) {
    setTimeout(() => {
      navigate(isCounselor ? "/home" : "/student-referral");
    }, 1000);
  }

  useEffect(() => {
    const handleLoadingComplete = () => {
      setLoadingComplete(true);
    };
    handleLoadingComplete();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full top-0 left-0 bg-gray-900 bg-opacity-70 justify-center items-center absolute">
      {isLoggedin ? (
        <p className=" text-white">
          You are already logged in. Redirecting to <span className=" text-primary-500">{isCounselor ? "Home" : "Student Referral"}</span>...
        </p>
      ) : (
        <p className=" text-white">Please wait while getting user info...</p>
      )}
    </div>
  );
};

export const Spinner = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const handleLoadingComplete = () => {
      setLoadingComplete(true);
    };
    handleLoadingComplete();
  }, [10000]);

  return (
    <>
      <div className=" w-full flex justify-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-tertiary" />;
      </div>
    </>
  );
};
