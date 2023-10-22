import logo from "@/assets/images/logo.png";
import homebg from "@/assets/images/homebg.png";

export const bgStyle = {
  backgroundImage: `url(${homebg})`,
  backgroundSize: "50%",
  backgroundPosition: "bottom right",
  backgroundRepeat: "no-repeat",
};

const Landing = () => {
  return (
    <>
      <div className=" h-full py-20 bg-primary bg-opacity-20" style={bgStyle}>
        <img src={logo} alt="WellTalk Logo" className="w-96 h-96" />
      </div>
    </>
  );
};

export default Landing;
