import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { BsChatLeftDots } from "react-icons/bs";
import CounselorLayout from "@/components/CounselorLayout";

type StudentProps = {
  student: {
    studentID: number;
    firstname: string;
    lastname: string;
    course: string;
    year: string;
    department: string;
  };
};

const Students = () => {
  const [students, setStudents] = useState<StudentProps["student"][]>([
    {
      studentID: 0,
      firstname: "",
      lastname: "",
      course: "",
      year: "",
      department: "",
    },
  ]);

  const fetchStudents = async () => {
    const response = await axios.get("/students");
    setStudents(response.data);
    console.log(response);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <CounselorLayout>
        <h1 className=" font-semibold">Students</h1>
        <div className=" w-full">
          <table className=" mt-10">
            <thead className=" text-center">
              <tr>
                <th className=" py-3 px-4">Student ID</th>
                <th className=" py-3 px-4">Lastname</th>
                <th className=" py-3 px-4">Firstname</th>
                <th className=" py-3 px-4">Course</th>
                <th className=" py-3 px-4">Year</th>
                <th className=" py-3 px-4">Department</th>
              </tr>
            </thead>
            <tbody className=" text-center">
              {students.map((student) => (
                <tr key={student.studentID} className=" items-center">
                  <td className=" py-2 px-4}">{student.studentID}</td>
                  <td className=" py-2 px-4}">{student.lastname}</td>
                  <td className=" py-2 px-4}">{student.firstname}</td>
                  <td className=" py-2 px-4}">{student.course}</td>
                  <td className=" py-2 px-4}">{student.year}</td>
                  <td className=" py-2 px-4}">{student.department}</td>
                  <td className=" py-2 px-4}">
                    <BsChatLeftDots className=" text-blue-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CounselorLayout>
    </>
  );
};

export default Students;
