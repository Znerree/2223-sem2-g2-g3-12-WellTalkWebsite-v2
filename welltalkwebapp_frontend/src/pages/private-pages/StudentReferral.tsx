import ReferralHeader from "@/components/ReferralHeader";

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

  return (
    <>
      <ReferralHeader />
      <div className=" ml-14">
        <h1 className="font-semibold text-2xl">Student Referral Form</h1>
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
              Please add a reason for referral
            </option>
            <option value="Counselor">Bully</option>
            <option value="Non-Counselor">Badlungon</option>
            <option value="Non-Counselor">Bastos</option>
          </select>
          <input
            type="text"
            placeholder="Other reason (optional)"
            style={inputStyle}
          />
          <button
            type="submit"
            className=" bg-primary rounded-full h-10 text-white hover:shadow-sm hover:shadow-primary mt-2"
          >
            Refer Student
          </button>
        </form>
      </div>
    </>
  );
};
