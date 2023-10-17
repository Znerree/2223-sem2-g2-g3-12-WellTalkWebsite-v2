import useLoading from "@/hooks/useLoading";
import Header from "./Header";
import { ProgressBar } from "./Loading";
import background from "@/assets/images/homebg.png";
import Footer from "./Footer";

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
          <Header />
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
