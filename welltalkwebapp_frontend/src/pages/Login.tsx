import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import formbackground from "../assets/images/formbg.png";
import pageBackground from "../assets/images/login-registerbg.png";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/authenticate";

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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const inputStyle = {
    borderBottom: "2px solid #769EAB",
    background: "transparent",
    outline: "none",
    width: "100%",
    padding: "2px 2px",
    marginBottom: "16px",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userRef.current) throw Error("No userRef");
    userRef.current;
  });

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log("logged in");
      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("Something went wrong");
      } else if (err.response?.status == 400) {
        setErrMsg("Invalid username or password");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
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
              Login
            </h1>
            <input
              name="username"
              ref={userRef}
              type="text"
              style={inputStyle}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="on"
              value={username}
              required
            />
            <input
              type="password"
              name="password"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
              value={password}
              required
            />
            <p
              ref={errRef}
              className={errMsg ? " text-red-400" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <button
              type="submit"
              className=" bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2"
            >
              Login
            </button>

            <p className=" text-secondary text-xs my-2">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-primary cursor-pointer"
              >
                Create
              </Link>
              <a className=" flex flex-1 text-center w-full">
                Forgot Password?
              </a>
            </p>
          </form>
          <div className=" flex relative justify-end px-6 py-5">
            <Link to="/">
              <IoMdClose className=" top-0 right-0 text-secondary hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;