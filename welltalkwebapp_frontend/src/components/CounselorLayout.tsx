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
        <aside>
          <SidebarNav />
        </aside>

        <div className=" w-full flex flex-col overflow-y-auto">
          <header className=" w-full sticky top-0 bg-white shadow ">
            {loading && <ProgressBar />}
            <Header />
          </header>

          {!loading && <main className="px-4 bg-gray-50">{children}</main>}
        </div>
      </div>
    </>
  );
};

export default CounselorLayout;
