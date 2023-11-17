import axios, { STUDENT_URL } from "@/api/axios";
import { Student } from "@/types/student";
import React, { useEffect, useState } from "react";

export const useFetchStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const response = await axios.get(STUDENT_URL);
      setStudents(response.data);
    };
    fetchStudentsData();
  }, []);

  return { students };
};
