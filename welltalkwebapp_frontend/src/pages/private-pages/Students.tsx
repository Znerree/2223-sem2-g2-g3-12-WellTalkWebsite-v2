import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { BsChatLeftDots } from "react-icons/bs";
import CounselorLayout from "@/app/layout/Layout";
import { FaSort } from "react-icons/fa";
import { Student } from "@/types/student";
import useFetchStudents from "@/hooks/useFetchStudent";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/student/data-table";
import { columns } from "@/components/student/table-columns";

const Students = () => {
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // const [filterYear, setFilterYear] = useState<string | null>(null);
  // const [filterCourse, setFilterCourse] = useState<string | null>(null);
  // const [filterCollege, setFilterCollege] = useState<string | null>(null);

  // const [originalStudents, setOriginalStudents] = useState<Student[][]>([]); // Save the original list of students to be used for filtering.

  const { students } = useFetchStudents();

  //SORT BY FIRST NAME FUNCTION
  // const handleSortByFirstName = () => {
  //   // Clone the current students array to avoid mutating the state directly.
  //   const sortedStudents = [...students];

  //   sortedStudents.sort((a, b) => {
  //     if (sortOrder === "asc") {
  //       return a.firstName.localeCompare(b.firstName);
  //     } else {
  //       return b.firstName.localeCompare(a.firstName);
  //     }
  //   });
  //   // Toggle the sorting order for the next click.
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  //SORT BY LAST NAME FUNCTION
  // const handleSortByLastName = () => {
  //   // Clone the current students array to avoid mutating the state directly.
  //   const sortedStudents = [...students];

  //   sortedStudents.sort((a, b) => {
  //     if (sortOrder === "asc") {
  //       return a.lastName.localeCompare(b.lastName);
  //     } else {
  //       return b.lastName.localeCompare(a.lastName);
  //     }
  //   });
  //   setStudents(sortedStudents);
  //   // Toggle the sorting order for the next click.
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  //SORT BY STUDENT ID FUNCTION
  // const handleSortByStudentID = () => {
  //   // Clone the current students array to avoid mutating the state directly.
  //   const sortedStudents = [...students];

  //   sortedStudents.sort((a, b) => {
  //     if (sortOrder === "asc") {
  //       return a.userid - b.userid;
  //     } else {
  //       return b.userid - a.userid;
  //     }
  //   });
  //   setStudents(sortedStudents);
  //   // Toggle the sorting order for the next click.
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  // //SORT BY YEAR FUNCTION
  // const compareByYear = (a: Student[], b: Student[]) => {
  //   const aValue = parseInt(a.year);
  //   const bValue = parseInt(b.year);

  //   if (sortOrder === "asc") {
  //     return aValue - bValue;
  //   } else {
  //     return bValue - aValue;
  //   }
  // };

  // const handleSortByYear = () => {
  //   // Clone the current students array to avoid mutating the state directly.
  //   const sortedStudents = [...students];

  //   sortedStudents.sort(compareByYear);

  //   setStudents(sortedStudents);
  //   // Toggle the sorting order for the next click.
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  // const applyFilter = (year: string | null, course: string | null, college: string | null) => {
  //   let filteredStudents = [...originalStudents.flat()];

  //   // if (year) {
  //   //   filteredStudents = filteredStudents.filter((student) => student.year === year);
  //   // }

  //   if (course) {
  //     filteredStudents = filteredStudents.filter(() => course === course);
  //   }

  //   // if (college) {
  //   //   filteredStudents = filteredStudents.filter((student) => student.college === college);
  //   // }

  //   setStudents(filteredStudents);
  // };

  // const handleFilterByYear = (selectedYear: string | null) => {
  //   setFilterYear(selectedYear);
  //   applyFilter(selectedYear, filterCourse, filterCollege);
  // };

  // const handleFilterByCourse = (selectedCourse: string | null) => {
  //   setFilterCourse(selectedCourse);
  //   applyFilter(filterYear, selectedCourse, filterCollege);
  // };

  // const handleFilterByCollege = (selectedCollege: string | null) => {
  //   setFilterCollege(selectedCollege);
  //   applyFilter(filterYear, filterCourse, selectedCollege);
  // };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={students} />
    </div>
  );
};

export default Students;
