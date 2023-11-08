import React from "react";
import HeroHeader from "./HeroHeader";
import Footer from "./Footer";
import homebg from "@/assets/images/homebg.png";

export const bgStyle = {
  backgroundImage: `url(${homebg})`,
  backgroundSize: "60%",
  backgroundPosition: "bottom right",
  backgroundRepeat: "no-repeat",
};

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-primaryLight">
      <HeroHeader />
      <main className=" h-full" style={bgStyle}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
