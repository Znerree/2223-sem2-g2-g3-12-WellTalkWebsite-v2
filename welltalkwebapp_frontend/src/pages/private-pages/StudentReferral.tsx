import ReferralHeader from "@/components/ReferralHeader";
import { useState } from "react";

export const StudentReferral = () => {
  // css style for input
  const inputStyle = {
    borderBottom: "2px solid #769EAB",
    background: "transparent",
    outline: "none",
    width: "100%",
    padding: "2px 2px",
    marginBottom: "16px",
  };

  const [referral, setReferral] = useState({});
  const [showOtherInput, setShowOtherInput] = useState(false); // State to track if the "If other/s" input should be displayed

  const handleReasonChange = (event: any) => {
    const selectedReason = event.target.value;
    if (selectedReason === "Other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  return (
    <>
      <ReferralHeader />
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <h1 className="font-semibold text-2xl">REFER SOMEONE NOW</h1>
        <form className="py-6 left-0 w-[300px] flex flex-col">
          <input
            type="text"
            placeholder="Input student name or ID number"
            style={inputStyle}
            required
          />
          <select
            name="userType"
            required
            className="mb-3 text-gray-400 outline-none text-sm border-2 border-secondary rounded-md p-2"
            defaultValue="label"
            onChange={handleReasonChange}
          >
            <option disabled value="label" hidden>
              Reason/s for referrals
            </option>
            <option value="Sample 1">Reason 1</option>
            <option value="Sample 2">Reason 2</option>
            <option value="Sample 3">Reason 3</option>
            <option value="Other">Others, please specify</option>
          </select>
          {showOtherInput && (
            <input type="text" placeholder="If other/s" style={inputStyle} />
          )}
          <button
            type="submit"
            className="bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};
