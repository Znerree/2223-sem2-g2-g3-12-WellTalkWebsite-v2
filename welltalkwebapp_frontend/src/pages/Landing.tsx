import LandingLayout from "@/components/LandingLayout";

const Landing = () => {
  return (
    <>
      <LandingLayout>
        <div className="flex h-full flex-col bg-primary bg-opacity-20">
          <div className="flex flex-col mx-20 my-20 w-96">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">The Joke Tax Chronicles</h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a
              problem: the kingdom was running out of money.
            </p>
            <button className=" mt-6 h-16 rounded-full bg-primary text-white hover:shadow-primary hover:shadow">Get Started</button>
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default Landing;
