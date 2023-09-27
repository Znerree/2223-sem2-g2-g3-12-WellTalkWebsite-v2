import ReferralHeader from "@/components/ReferralHeader";
// import React, {useState} from "react";

export const StudentReferral = () => {
  //css style for input
  const inputStyle = {
    borderBottom: "2px solid #769EAB",
    background: "transparent",
    outline: "none",
    width: "100%",
    padding: "2px 2px",
    marginBottom: "16px",
  };

  // const [input, setInput] = useState("");
  // const fetchData = (value) => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //   .then{(response) => response.json()}
  //   .then{(json) => {
  //     const results = json.filter((user) => {
  //       return (
  //         value &&
  //         user &&
  //         user.name &&
  //         user.name.toLowerCase().includes(value)
  //       );
  //     });
  //     console.log(results);
  //   }}
      
  // };

  // const handleChange = (value) => {
  //   setInput(value);
  //   fetchData(value);
  // }

  return (
    <>
      <ReferralHeader />
      <div className=" ml-14 flex flex-col justify-center items-center">
        <h1 className="font-semibold text-2xl">REFER SOMEONE NOW</h1>
        <form className=" py-6 left-0 w-[300px] flex flex-col">
          <input
            type="text"
            placeholder=" Input student name or ID number"
            style={inputStyle}
            required
          />
          <select
            name="userType"
            required
            className=" mb-3 text-gray-400 outline-none text-sm border-2 border-secondary rounded-md p-2"
            defaultValue="label"
          >
            <option disabled value="label" hidden>
              Reason/s for referrals
            </option>
            <option value="Counselor">Sample 1</option>
            <option value="Non-Counselor">Sample 2</option>
            <option value="Non-Counselor">Sample 3</option>
          </select>
          <input
            type="text"
            placeholder="If other/s"
            style={inputStyle}
            // value={input}
            // onChange={(e) => setInput(e.target.value)} 
          />
          <button
            type="submit"
            className=" bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};
