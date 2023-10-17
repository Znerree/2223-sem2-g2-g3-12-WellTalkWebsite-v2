import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { BsChatLeftDots } from "react-icons/bs";
import CounselorLayout from "@/components/CounselorLayout";
import { FaSort } from "react-icons/fa";

type StudentProps = {
  student: {
    id: number;
    studentID: number;
    firstname: string;
    lastname: string;
    course: string;
    year: string;
    department: string;
  };
};

const Students = () => {
  const [students, setStudents] = useState<StudentProps["student"][]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchStudents = async () => {
    const response = await axios.get("/students");
    setStudents(response.data);
    console.log(response);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  //SORT BY FIRST NAME FUNCTION
  const handleSortByFirstName = () => {
    // Clone the current students array to avoid mutating the state directly.
    const sortedStudents = [...students];

    sortedStudents.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.firstname.localeCompare(b.firstname);
      } else {
        return b.firstname.localeCompare(a.firstname);
      }
    });
    setStudents(sortedStudents);
    // Toggle the sorting order for the next click.
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //SORT BY LAST NAME FUNCTION
  const handleSortByLastName = () => {
    // Clone the current students array to avoid mutating the state directly.
    const sortedStudents = [...students];

    sortedStudents.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.lastname.localeCompare(b.lastname);
      } else {
        return b.lastname.localeCompare(a.lastname);
      }
    });
    setStudents(sortedStudents);
    // Toggle the sorting order for the next click.
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //SORT BY STUDENT ID FUNCTION
  const handleSortByStudentID = () => {
    // Clone the current students array to avoid mutating the state directly.
    const sortedStudents = [...students];

    sortedStudents.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.studentID - b.studentID;
      } else {
        return b.studentID - a.studentID;
      }
    });
    setStudents(sortedStudents);
    // Toggle the sorting order for the next click.
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //SORT BY YEAR FUNCTION
  const compareByYear = (a: StudentProps["student"], b: StudentProps["student"]) => {
    const aValue = parseInt(a.year);
    const bValue = parseInt(b.year);

    if (sortOrder === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  };

  const handleSortByYear = () => {
    // Clone the current students array to avoid mutating the state directly.
    const sortedStudents = [...students];

    sortedStudents.sort(compareByYear);

    setStudents(sortedStudents);
    // Toggle the sorting order for the next click.
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <CounselorLayout>
        <h1 className=" font-semibold">Students</h1>
        <div className=" w-full flex justify-center ">
          <div className="border-2 rounded-lg px-5 py-5 shadow-lg bg-white">
          <div className=" max-h-[550px] overflow-y-auto">
            <table className=" mt-10 pt-0">
              <thead className="text-left sticky top-0 bg-white shadow-sm">
                <tr className="py-4 pr-4">
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      First Name
                      <div className="ml-auto">
                        <FaSort className="cursor-pointer ml-2 hover:text-primary" size={10} onClick={handleSortByFirstName} />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      Last Name
                      <div className="ml-auto">
                        <FaSort className="cursor-pointer ml-2 hover:text-primary" size={10} onClick={handleSortByLastName} />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      Student ID
                      <div className="ml-auto">
                        <FaSort className="cursor-pointer ml-2 hover:text-primary" size={10} onClick={handleSortByStudentID} />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      Year
                      <div className="ml-auto">
                        <FaSort className="cursor-pointer ml-2 hover:text-primary" size={10} onClick={handleSortByYear} />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      Course
                      <div className="ml-auto"></div>
                    </div>
                  </th>
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      College
                      <div className="ml-auto"></div>
                    </div>
                  </th>
                  <th className="py-4 pl-4 pr-14">
                    <div className="flex items-center">
                      <div className="ml-auto"></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className=" text-left">
                {students.map((student) => (
                  <tr key={student.id} className="items-left border-t-2 hover:shadow-md hover:bg-gray-200  cursor-pointer">
                    <td className=" py-4 px-4">{student.firstname}</td>
                    <td className=" py-4 px-4">{student.lastname}</td>
                    <td className=" py-4 px-4">{student.studentID}</td>
                    <td className=" py-4 px-4">{student.year}</td>
                    <td className=" py-4 px-4">{student.course}</td>
                    <td className=" py-4 px-4">{student.department}</td>
                    <td className=" py-4 px-4">
                      <BsChatLeftDots className=" text-blue-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </CounselorLayout>
    </>
  );
};

export default Students;
