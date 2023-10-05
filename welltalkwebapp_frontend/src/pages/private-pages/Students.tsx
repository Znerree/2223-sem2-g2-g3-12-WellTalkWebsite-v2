import { useState, useEffect } from "react";
import axios from "@/api/axios";

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
      <div className=" ml-72 top-20 absolute">
        <h1 className=" font-semibold">Students</h1>
        <div className=" w-ful">
          <table className=" mt-4">
            <thead className="">
              <tr className=" text-left">
                <th className=" border border-secondary px-2">Student ID</th>
                <th className=" border border-secondary px-2">Firstname</th>
                <th className=" border border-secondary px-2">Lastname</th>
                <th className=" border border-secondary px-2">Course</th>
                <th className=" border border-secondary px-2">Year</th>
                <th className=" border border-secondary px-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentID}>
                  <td className=" border border-secondary px-2">
                    {student.studentID}
                  </td>
                  <td className=" border border-secondary px-2">
                    {student.firstname}
                  </td>
                  <td className=" border border-secondary px-2">
                    {student.lastname}
                  </td>
                  <td className=" border border-secondary px-2">
                    {student.course}
                  </td>
                  <td className=" border border-secondary px-2">
                    {student.year}
                  </td>
                  <td className=" border border-secondary px-2">
                    {student.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Students;
