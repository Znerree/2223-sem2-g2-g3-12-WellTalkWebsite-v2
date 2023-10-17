import useLoading from "@/hooks/useLoading";
import { ProgressBar } from "./Loading";
import background from "@/assets/images/homebg.png";
import Footer from "./Footer";
import LandingHeader from "./LandingHeader";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  const { loading } = useLoading();

  const bg = {
    backgroundImage: `url(${background})`,
    backgroundSize: " 50%",
    backgroundPosition: "right bottom",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="flex h-screen flex-col">
        <header>
          {loading && <ProgressBar />}
          <LandingHeader />
        </header>

        <main className=" h-full" style={bg}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default LandingLayout;
