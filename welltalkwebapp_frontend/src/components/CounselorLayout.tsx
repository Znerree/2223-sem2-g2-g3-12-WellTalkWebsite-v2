// import CounselorHeader from "./CounselorHeader";
import useLoading from "@/hooks/useLoading";
import Header from "./Header";
import { ProgressBar } from "./Loading";
import SidebarNav from "./SidebarNav";
// import SidebarNav from "./SidebarNav";

type Props = {
  children: React.ReactNode;
};

const CounselorLayout = ({ children }: Props) => {
  const { loading } = useLoading();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SidebarNav />
        <div className=" flex-1 flex flex-col overflow-auto">
          <nav className=" shadow bg-white sticky top-0">
            <Header />
          </nav>
          {loading && <ProgressBar />}
          <div className=" md:container flex flex-col pt-2 bg-gray-50">{children}</div>
        </div>
      </div>
    </>
  );
};

export default CounselorLayout;
