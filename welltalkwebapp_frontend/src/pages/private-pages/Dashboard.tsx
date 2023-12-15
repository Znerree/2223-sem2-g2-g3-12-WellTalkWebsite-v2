import CounselorLayout from "@/components/layouts/CounselorLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Layout } from "lucide-react";
import { useEffect, useState } from "react";
import { PiStudent } from "react-icons/pi";
import axios from "@/api/axios";
import { get } from "http";
import { BsPostcard, BsPostcardHeart } from "react-icons/bs";
import { LiaCalendarCheck } from "react-icons/lia";
import { FaUsers } from "react-icons/fa6";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [myPostCount, setMyPostCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [counselorPercentage, setCounselorPercentage] = useState(0);

  const getStudentCount = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    await axios.get("https://abhorrent-soda-production.up.railway.app/getAllUser", config).then((response) => {
      setStudentCount(response.data.length);
    });
  };

  const getMyPostCount = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    await axios.get("/myPosts", config).then((response) => {
      setMyPostCount(response.data.length);
    });
  };

  const getAppointmentCount = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    await axios.get("/myappointments", config).then((response) => {
      setAppointmentCount(response.data.length);
    });
  };

  const getCounselorPercentage = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    let totalUsers = 0;
    let counselorCount = 0;

    await axios.get("/users", config).then((response) => {
      totalUsers = response.data.length; // Assuming response.data is an array of users

      response.data.forEach((user: any) => {
        if (user.userType === "Counselor") {
          counselorCount++;
        }
      });

      const counselorPercentage = (counselorCount / totalUsers) * 100;
      setCounselorPercentage(counselorPercentage);
    });
  };

  useEffect(() => {
    getStudentCount();
    getMyPostCount();
    getAppointmentCount();
    getCounselorPercentage();
  }, []);

  return (
    <>
      <div className=" flex flex-wrap w-full gap-3">
        <Card className=" md:w-72 rounded-md hover:shadow-lg cursor-pointer w-full">
          <CardContent className="p-4">
            <PiStudent className=" h-10 w-10 p-2 bg-primary-200 text-primary-600 rounded-full" />
            <div className=" text-right">
              <h1 className=" text-5xl font-bold text-primary-500">{studentCount}</h1>
              <p className=" text-slate-300 text-sm">students registered to Welltalk</p>
            </div>
          </CardContent>
        </Card>

        <Card className=" lg:w-72 rounded-md hover:shadow-lg cursor-pointer w-full">
          <CardContent className="p-4 flex justify-between my-auto h-full items-center">
            <BsPostcardHeart className=" h-12 w-12 p-2 bg-red-200 text-red-400 rounded-full" />
            <span className=" text-right">
              <h1 className=" text-6xl font-bold text-red-400">{myPostCount}</h1>
              <p className="  text-slate-300 text-sm"> active post</p>
            </span>
          </CardContent>
        </Card>

        <Card className=" md:w-72 rounded-md hover:shadow-lg cursor-pointer w-full">
          <CardContent className="p-4">
            <LiaCalendarCheck className=" h-10 w-10 p-2 bg-orange-200 text-orange-600 rounded-full" />
            <div className=" text-right">
              <h1 className=" text-5xl font-bold text-orange-500">{appointmentCount}</h1>
              <p className=" text-slate-300 text-sm"> appointments</p>
            </div>
          </CardContent>
        </Card>

        <Card className=" lg:w-72 rounded-md hover:shadow-lg cursor-pointer w-full">
          <CardContent className="p-4 flex justify-between my-auto h-full items-center">
            <FaUsers className=" h-12 w-12 p-2 bg-violet-200 text-violet-400 rounded-full" />
            <span className=" text-right">
              <h1 className=" text-6xl font-bold text-violet-400">%{counselorPercentage.toFixed(0)}</h1>
              <p className="  text-slate-300 text-sm">of users are Counselors</p>
            </span>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
