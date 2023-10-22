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
      <div className="flex h-full flex-col bg-primary bg-opacity-20" style={bgStyle}>
        <div className="flex flex-col container">
          <img src={logo} alt="WellTalk Logo" className="w-96 h-96" />
        </div>
      </div>
    </>
  );
};

export default Landing;
