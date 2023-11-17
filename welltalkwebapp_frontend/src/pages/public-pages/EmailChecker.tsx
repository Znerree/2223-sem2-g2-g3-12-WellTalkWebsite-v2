import { ChangeEvent, useState } from "react";
import formbackground from "@/assets/images/formbg.png";
import pageBackground from "@/assets/images/login-registerbg.png";
import { IoMdClose } from "react-icons/io";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

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

const CHECK_EMAIL = "users";

const EmailChecker = () => {
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
  const [otpInputVisible, setOtpInputVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setOtp(e.target.value);
  };

  const handleEmailCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email !== "" && !user.email.includes("@cit.edu")) {
      alert("Please use your institutional email");
      return;
    }
    try {
      const response = await axios.get(CHECK_EMAIL + `/${user.email}`);
      console.log("Email exists in the database.");
      console.log(response.data);
      setOtpInputVisible(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full bg-gray-100 justify-center items-center absolute" style={pageBg}>
        <div className=" w-[720px] rounded-2xl bg-white shadow-md h-auto flex justify-between" style={formbg}>
          <form className="py-6 px-10 left-0 w-[360px] flex flex-col" onSubmit={otpInputVisible ? handleOtpSubmit : handleEmailCheck}>
            <h1 className="text-center font-medium text-primary text-2xl mb-3">{otpInputVisible ? "Enter OTP" : "Please verify your email"}</h1>
            {otpInputVisible && (
              <input
                name="otp"
                type="text"
                style={inputStyle}
                onChange={handleInput}
                placeholder="Please check your email for OTP"
                autoComplete="off"
                required
              />
            )}
            {!otpInputVisible && (
              <input name="email" type="email" style={inputStyle} onChange={handleInput} placeholder="Institutional Email" autoComplete="off" required />
            )}
            {otpInputVisible && (
              <button type="submit" className="bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2">
                Verify OTP
              </button>
            )}
            {!otpInputVisible && (
              <button type="submit" className=" bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2">
                Check Email
              </button>
            )}

            <p className="text-secondary text-xs my-2">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-primary cursor-pointer">
                Login
              </Link>
            </p>
          </form>
          <div className="flex relative justify-end px-6 py-5">
            <Link to="/">
              <IoMdClose className="top-0 right-0 text-secondary hover:text-primary cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailChecker;
