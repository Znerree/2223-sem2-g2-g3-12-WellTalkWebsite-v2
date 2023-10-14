// import CounselorHeader from "./CounselorHeader";
import Header from "./Header";
import SidebarNav from "./SidebarNav";
// import SidebarNav from "./SidebarNav";

type Props = {
  children: React.ReactNode;
};

const CounselorLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex h-screen">
        <SidebarNav />
        <div className=" flex-1 flex flex-col overflow-y-auto">
          <nav className=" shadow bg-white sticky top-0">
            <Header />
          </nav>
          <div className=" md:container flex flex-col pt-2 bg-gray-50">{children}</div>
        </div>
      </div>
    </>
  );
};

export default CounselorLayout;
