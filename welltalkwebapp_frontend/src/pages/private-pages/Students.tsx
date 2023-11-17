import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { BsChatLeftDots } from "react-icons/bs";
import CounselorLayout from "@/app/layout/Layout";
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
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [filterCourse, setFilterCourse] = useState<string | null>(null);
  const [filterCollege, setFilterCollege] = useState<string | null>(null);

  const [originalStudents, setOriginalStudents] = useState<StudentProps["student"][]>([]); // Save the original list of students to be used for filtering.

  const fetchStudents = async () => {
    const response = await axios.get("/students");
    setStudents(response.data);
    setOriginalStudents(response.data);
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

  const applyFilter = (year: string | null, course: string | null, college: string | null) => {
    let filteredStudents = [...originalStudents];

    if (year) {
      filteredStudents = filteredStudents.filter((student) => student.year.toString() === year);
    }

    if (course) {
      filteredStudents = filteredStudents.filter((student) => student.course === course);
    }

    if (college) {
      filteredStudents = filteredStudents.filter((student) => student.department === college);
    }

    setStudents(filteredStudents);
  };

  const handleFilterByYear = (selectedYear: string | null) => {
    setFilterYear(selectedYear);
    applyFilter(selectedYear, filterCourse, filterCollege);
  };

  const handleFilterByCourse = (selectedCourse: string | null) => {
    setFilterCourse(selectedCourse);
    applyFilter(filterYear, selectedCourse, filterCollege);
  };

  const handleFilterByCollege = (selectedCollege: string | null) => {
    setFilterCollege(selectedCollege);
    applyFilter(filterYear, filterCourse, selectedCollege);
  };

  return (
    <>
      <div className=" border-2 rounded-lg px-5 mx-4 shadow-lg bg-white">
        <div className=" flex flex-col max-h-[550px] overflow-y-auto">
          <div className="flex flex-wrap">
            <div className=" mb-4 p-2 flex justify-between items-center">
              <label className="mr-2 whitespace-nowrap">Filter by Year:</label>
              <select
                className=" py-2 pl-3 pr-8 border hover:cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                value={filterYear || ""}
                onChange={(e) => handleFilterByYear(e.target.value || null)}
              >
                <option value="">All</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="5">Year 5</option>
              </select>
            </div>
            <div className="filter-container mb-4 p-2 flex justify-between items-center">
              <label className="mr-2 whitespace-nowrap">Filter by Course:</label>
              <select
                className=" w-full py-2 pl-3 pr-8 border hover:cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                value={filterCourse || ""}
                onChange={(e) => handleFilterByCourse(e.target.value || null)}
              >
                <option value="">All</option>
                <option value="BSIT">BSIT</option>
                <option value="BSCS">BSCS</option>
                <option value="BSEE">BSEE</option>
              </select>
            </div>
            <div className="filter-container mb-4 p-2 flex justify-between items-center">
              <label className="mr-2 whitespace-nowrap">Filter by College:</label>
              <select
                className="block w-full py-2 pl-3 pr-8 border hover:cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                value={filterCollege || ""}
                onChange={(e) => handleFilterByCollege(e.target.value || null)}
              >
                <option value="">All</option>
                {/* Add options for available colleges */}
              </select>
            </div>
          </div>
          <table className=" pt-0">
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
                <tr key={student.id} className="items-left border-t-2 hover:bg-gray-200 cursor-pointer">
                  <td className=" py-4 px-4">{student.firstname}</td>
                  <td className=" py-4 px-4">{student.lastname}</td>
                  <td className=" py-4 px-4">{student.studentID}</td>
                  <td className=" py-4 px-4">{student.year}</td>
                  <td className=" py-4 px-4">{student.course}</td>
                  <td className=" py-4 px-4">{student.department}</td>
                  <td className=" py-4 px-4">
                    <a href={`https://teams.microsoft.com/l/chat/0/0?users=${student.firstname}&topicName=New%20Chat`} target=" blank">
                      <BsChatLeftDots className=" text-blue-500 cursor-pointer" />
                    </a>
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
