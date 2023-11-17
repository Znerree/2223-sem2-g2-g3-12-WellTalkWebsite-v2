import React from "react";
import LandingHeader from "../../components/headers/LandingHeader";
import Footer from "../../components/footer/Footer";
import pageBg from "@/assets/images/login-registerbg.png";
import homebg from "@/assets/images/homebg.png";

export const bgStyle = {
  backgroundImage: `url(${homebg})`,
  backgroundSize: "60%",
  backgroundPosition: "bottom right",
  backgroundRepeat: "no-repeat",
};

const pageBckground = {
  backgroundImage: `url(${pageBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-primary-100" style={pageBckground}>
      <LandingHeader />
      <main className=" h-full" style={bgStyle}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
