import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch, AiFillAlert } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const CounselorHeader = () => {
  // State to toggle the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className=" flex justify-between px-4">
        <h1> {""} </h1>
        <div className=" flex items-center py-4 gap-4">
          <div className="relative">
            <input name="search" className="outline-none border bg-gray-50 border-gray-300 rounded-lg h-8 pl-8 pr-2 p-2" placeholder="Search..." />
            <div className="absolute top-0 left-2 flex items-center h-full text-gray-400">
              <AiOutlineSearch />
            </div>
          </div>
          <a href="/emergency-link">
            <AiFillAlert className="text-red-700 h-6 w-6 cursor-pointer" />
          </a>
        </div>
      </div>
    </>
  );
};

export default CounselorHeader;
