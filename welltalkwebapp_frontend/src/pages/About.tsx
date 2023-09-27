import background from "@/assets/images/homebg.png";
import Footer from "@/components/Footer";
import HeadNav from "@/components/HeadNav";

const About = () => {
  const bg = {
    backgroundImage: `url(${background})`,
    backgroundSize: " 50%",
    backgroundPosition: "right bottom",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <HeadNav />
      <div
        className={"flex flex-col h-screen bg-primary bg-opacity-20"}
        style={bg}
      >
        <h1>About</h1>
      </div>
      <Footer />
    </>
  );
};

export default About;
