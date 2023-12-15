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


const GETSTUDENTBYID_MOBILE_URL = "https://abhorrent-soda-production.up.railway.app/userByStudentID";

const useFetchStudentById = (id: string) => {
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    const fetchStudentData = async () => {
      const config = {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      };
      const response = await axios.get(`${GETSTUDENTBYID_MOBILE_URL}/${id}`, config);
      setStudent(response.data);
      console.log(response.data);
    };
    fetchStudentData();
  }, []);

  return { student, setStudent };
}

export default useFetchStudent;
