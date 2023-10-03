import { ChangeEvent, useState } from "react";
import formbackground from "../assets/images/formbg.png";
import pageBackground from "../assets/images/login-registerbg.png";
import { IoMdClose } from "react-icons/io";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
const formbg = {
  backgroundImage: `url(${formbackground})`,
  backgroundSize: " 50%",
  backgroundPosition: "right",
  backgroundRepeat: "no-repeat",
};

const pageBg = {
  backgroundImage: `url(${pageBackground})`,
  backgroundSize: " 100%",
  backgroundRepeat: "no-repeat",
};

const REGISTER_URL = "users/register";

const Register = () => {
  //css style for input
  const inputStyle = {
    borderBottom: "2px solid #769EAB",
    background: "transparent",
    outline: "none",
    width: "100%",
    padding: "2px 2px",
    marginBottom: "16px",
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    schoolID: "",
    userType: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, userType: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email !== "" && !user.email.includes("@cit.edu")) {
      alert("Please use your institutional email");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match, please check again");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      });
      alert("Account created successfully");
      console.log(response.data);
      console.log(response.status);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="flex flex-col h-screen w-full bg-gray-100 justify-center items-center absolute"
        style={pageBg}
      >
        <div
          className=" w-[720px] rounded-2xl bg-white shadow-md h-auto flex justify-between"
          style={formbg}
        >
          <form
            className=" py-6 px-10 left-0 w-[360px] flex flex-col"
            onSubmit={handleSubmit}
          >
            <h1 className=" text-center font-medium text-primary text-4xl mb-3">
              Register
            </h1>
            <div className=" flex gap-2">
              <input
                name="firstName"
                type="text"
                style={inputStyle}
                onChange={handleInput}
                placeholder="Firstname"
                autoComplete="off"
                required
              />
              <input
                name="lastName"
                type="text"
                style={inputStyle}
                onChange={handleInput}
                placeholder="Lastname"
                autoComplete="off"
                required
              />
            </div>
            <input
              name="email"
              type="email"
              style={inputStyle}
              onChange={handleInput}
              placeholder="Email"
              autoComplete="off"
              required
            />
            <input
              name="schoolID"
              type="number"
              style={inputStyle}
              onChange={handleInput}
              placeholder="Institutional ID"
              autoComplete="off"
              required
            />
            <select
              name="userType"
              onChange={handleUserTypeChange}
              required
              className=" mb-3 text-gray-400 outline-none text-sm border-2 border-secondary rounded-md p-2"
              defaultValue="label"
            >
              <option disabled value="label" hidden>
                I am a ...
              </option>
              <option value="Counselor">Counselor</option>
              <option value="Teacher">Teacher</option>
            </select>
            <input
              name="username"
              type="text"
              style={inputStyle}
              onChange={handleInput}
              placeholder="Username"
              autoComplete="off"
              required
            />
            <input
              name="password"
              type="password"
              style={inputStyle}
              onChange={handleInput}
              placeholder="Password"
              autoComplete="off"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              style={inputStyle}
              onChange={handleInput}
              placeholder="Comfirm Password"
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className=" bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2"
            >
              Create Account
            </button>

            <p className=" text-secondary text-xs my-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-primary cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
          <div className=" flex relative justify-end px-6 py-5">
            <Link to="/">
              <IoMdClose className=" top-0 right-0 text-secondary hover:text-primary cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
