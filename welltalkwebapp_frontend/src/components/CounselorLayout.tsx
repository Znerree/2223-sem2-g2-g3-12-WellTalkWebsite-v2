import useLoading from "@/hooks/useLoading";
import { ProgressBar } from "./Loading";
import SidebarNav from "./SidebarNav";
import CounselorHeader from "./CounselorHeader";

type Props = {
  children: React.ReactNode;
};

const CounselorLayout = ({ children }: Props) => {
  const { loading } = useLoading();

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <aside>
          <SidebarNav />
        </aside>

        <div className=" w-full flex flex-col overflow-y-auto">
          <header className=" w-full sticky top-0 bg-white shadow">
            {loading && <ProgressBar />}
            <CounselorHeader />
          </header>

          {!loading && <main className="p-4 bg-gray-50">{children}</main>}
        </div>
      </div>
    </>
  );
};

export default CounselorLayout;
