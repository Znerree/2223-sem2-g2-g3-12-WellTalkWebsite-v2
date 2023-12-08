import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import DefaultHeader from "../headers/DefaultHeader";

const DefaultLayout = () => {
  return (
    <div className="  flex flex-col h-screen md:bg-[url('@/media/images/defaultbg.png')] bg-no-repeat bg-origin-border bg-center bg-primary-100">
      <div>
        <DefaultHeader />
      </div>

      <div className="h-full container">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
