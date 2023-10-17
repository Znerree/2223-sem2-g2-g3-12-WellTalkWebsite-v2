import LandingLayout from "@/components/LandingLayout";
import logo from "@/assets/images/logo.png";

const Landing = () => {
  return (
    <>
      <LandingLayout>
        <div className="flex h-full flex-col bg-primary bg-opacity-20">
          <div className="flex flex-col mx-20 my-20 w-96">
            <img src={logo} alt="WellTalk Logo" className="w-96 h-96" />
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default Landing;
