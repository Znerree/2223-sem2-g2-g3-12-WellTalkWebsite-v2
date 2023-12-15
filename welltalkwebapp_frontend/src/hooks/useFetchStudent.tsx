import axios from "axios";
import { Student } from "@/types/student";
import React, { useEffect, useState } from "react";

const GETSTUDENT_MOBILE_URL = "https://abhorrent-soda-production.up.railway.app/getAllUser";

const useFetchStudent = () => {
  const [students, setStudents] = useState([] as Student[]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const config = {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      };
      const response = await axios.get(`${GETSTUDENT_MOBILE_URL}`, config);
      setStudents(response.data);
      console.log(response.data);
    };
    fetchStudentsData();
  }, []);

  return { students, setStudents };
};

export default useFetchStudent;
