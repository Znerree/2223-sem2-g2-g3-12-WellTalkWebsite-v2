import LoggedinHeader from "./LoggedinHeader";
import SidebarNav from "./SidebarNav";

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
            <LoggedinHeader />
          </nav>
          <div className=" md:container flexflex-col pt-2 bg-gray-50">{children}</div>
        </div>
      </div>
    </>
  );
};

export default CounselorLayout;
