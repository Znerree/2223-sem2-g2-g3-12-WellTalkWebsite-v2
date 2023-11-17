import LandingContentBottom from "./landingcontent-bottom";
import LandingContentText from "./landingcontent-text";

const LandingPageContent = () => {
  return (
    <div className=" h-full flex md:w-[600px] items-center mx-10 gap-5">
      <span>
        <LandingContentText />
        <LandingContentBottom />
      </span>
    </div>
  );
};

export default LandingPageContent;
