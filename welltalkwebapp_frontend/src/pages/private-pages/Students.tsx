import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { BsChatLeftDots } from "react-icons/bs";
import CounselorLayout from "@/components/layouts/CounselorLayout";
import { FaSort } from "react-icons/fa";
import { Student } from "@/types/student";
import useFetchStudents from "@/hooks/useFetchStudent";
import { DataTable } from "@/components/student/data-table";
import { columns } from "@/components/student/table-columns";

const Students = () => {
  const { students } = useFetchStudents();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={students} />
    </div>
  );
};

export default Students;
