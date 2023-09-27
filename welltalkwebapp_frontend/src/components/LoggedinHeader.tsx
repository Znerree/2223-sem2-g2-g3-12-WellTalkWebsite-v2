import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch, AiFillAlert } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LoggedinHeader = () => {
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logged out");
  };

  return (
    <>
      <div className="w-full flex justify-between">
        <h1>{""}</h1>
        <div className="py-4 px-6 flex gap-2 items-center relative">
          <div className="relative">
            <input
              name="search"
              className="outline-none border bg-gray-100 border-gray-300 rounded-lg h-8 pl-8 pr-2 p-2"
              placeholder="Search..."
            />
            <div className="absolute top-0 left-2 flex items-center h-full text-gray-400">
              <AiOutlineSearch />
            </div>
          </div>
          <RiArrowDropDownLine
            className="text-secondary h-8 w-8 hover:text-primary cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute mt-14 right-0 bg-white border border-gray-300 rounded-lg shadow-md mx-6"
            >
              <button
                className="block px-4 py-1 rounded-lg w-full text-sm text-secondary hover:bg-primary hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <AiFillAlert className="text-red-500 h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default LoggedinHeader;