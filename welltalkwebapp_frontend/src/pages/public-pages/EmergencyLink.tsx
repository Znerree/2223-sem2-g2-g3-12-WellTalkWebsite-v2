import pageBackground from "@/assets/images/login-registerbg.png";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const pageBg = {
  backgroundImage: `url(${pageBackground})`,
  backgroundSize: " 100%",
  backgroundRepeat: "no-repeat",
};

const EmergencyLink = () => {
  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center" style={pageBg}>
      <div className=" absolute left-0 top-0 p-4">
        <button onClick={handleReturn} className=" flex items-center gap-1 text-xl hover:text-red-500">
          <IoChevronBackCircleOutline /> <span>Back</span>
        </button>
      </div>
      <div className="w-1/3 justify-center flex shadow-md rounded-lg h-2/4 border-2 border-red-500 p-2">
        <h1 className=" text-2xl font-bold">Emergency contact numbers</h1>
      </div>
    </div>
  );
};

export default EmergencyLink;
