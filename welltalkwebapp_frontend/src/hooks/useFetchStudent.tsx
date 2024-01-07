import axios from "axios";
import { Student } from "@/types/student";
import React, { useEffect, useState } from "react";
import { STUDENT_BASE_API } from "@/api/axios";

const useFetchStudent = () => {
  const [students, setStudents] = useState([] as Student[]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const config = {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      };
      const response = await axios.get(STUDENT_BASE_API + "/getAllUser", config);
      setStudents(response.data);
      console.log(response.data);
    };
    fetchStudentsData();
  }, []);

  return { students, setStudents };
};

const useFetchStudentById = (id: string) => {
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    const fetchStudentData = async () => {
      const config = {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      };
      const response = await axios.get(STUDENT_BASE_API + `/userByStudentID/${id}`, config);
      setStudent(response.data);
      console.log(response.data);
    };
    fetchStudentData();
  }, []);

  return { student, setStudent };
};

export default useFetchStudent;
