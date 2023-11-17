import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <>
      <span>
        <img src={logo} alt="WellTalk Logo" className="w-20 h-20 shrink-0" />
        {/* <h1 className=" font-thin text-2xl text-primary">WellTalk</h1> */}
      </span>
    </>
  );
};

export default Logo;
