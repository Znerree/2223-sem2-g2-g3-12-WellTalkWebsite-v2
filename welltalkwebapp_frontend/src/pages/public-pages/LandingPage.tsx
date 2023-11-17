import homebg from "@/assets/images/homebg.png";
import LandingPageContent from "@/components/landingpage-contents/LandingPageContent";
import LandingContentBottom from "@/components/landingpage-contents/landingcontent-bottom";
import LandingContentText from "@/components/landingpage-contents/landingcontent-text";

export const bgStyle = {
  backgroundImage: `url(${homebg})`,
  backgroundSize: "50%",
  backgroundPosition: "bottom right",
  backgroundRepeat: "no-repeat",
};

const Homepage = () => {
  return (
    <>
      <LandingPageContent />
    </>
  );
};

export default Homepage;
