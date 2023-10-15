import LandingHeader from "./LandingHeader";
import CounselorHeader from "./CounselorHeader";
import ReferralHeader from "./ReferralHeader";

const Header = () => {
  const userType = localStorage.getItem("userType");

  try {
    if (userType === "Counselor") {
      return <CounselorHeader />;
    } else if (userType === "Referral") {
      return <ReferralHeader />;
    } else {
      return <LandingHeader />;
    }
  } catch (err) {
    console.log(err);
  }
};

export default Header;
