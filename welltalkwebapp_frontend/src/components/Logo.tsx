import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <>
      <span className=" flex items-center">
        <img src={logo} alt="WellTalk Logo" className="w-16 h-16" />
        <p className=" font-medium text-2xl text-tertiary ">WellTalk</p>
      </span>
    </>
  );
};

export default Logo;
