import { useState, ChangeEvent, useEffect } from "react";
import axios from "@/api/axios";
import { Student } from "@/types/student";

//Custom hook for handling student search
const useStudentSearch = () => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [studentID, setStudentId] = useState("");

  const fetchStudents = async () => {
    const response = await axios.get("students");
    return response.data;
  };

  const useFetchStudents = () => {
    const [students, setStudents] = useState([] as Student[]);

    useEffect(() => {
      const fetchStudentsData = async () => {
        const data = await fetchStudents();
        setStudents(data);
      };
      fetchStudentsData();
    }, []);

    return { students };
  };

  const handleQueryChange = (
    event: ChangeEvent<HTMLInputElement>,
    students: Student[],
    setResults: (results: Student[]) => void,
    setShowResultsDropdown: (show: boolean) => void,
    setValue: (value: string) => void,
    setQuery: (query: string) => void
  ) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setQuery(inputValue);
    const filteredStudents = students.filter(
      (student) => student.firstname.toLowerCase().includes(inputValue.toLowerCase()) || student.lastname.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredStudents);
    setShowResultsDropdown(filteredStudents.length > 0);
  };

  const handleStudentInput = (
    studentName: string,
    students: Student[],
    setStudentId: (id: string) => void,
    setValue: (value: string) => void,
    setResults: (results: Student[]) => void,
    setQuery: (query: string) => void
  ) => {
    setValue(studentName);
    setResults([]);
    setQuery("");

    const selectedStudent = students.find((student) => student.firstname + " " + student.lastname === studentName);
    if (selectedStudent) {
      setStudentId(selectedStudent.id.toString());
    }
  };

  const handleClear = () => {
    setValue("");
    setResults([]);
    setQuery("");
  };

  return {
    selectedStudent: value,
    value,
    setValue,
    query,
    setQuery,
    studentID,
    setStudentId,
    results,
    setResults,
    showResultsDropdown,
    setShowResultsDropdown,
    useFetchStudents,
    handleQueryChange,
    handleStudentInput,
    handleClear,
  };
};

export default useStudentSearch;
