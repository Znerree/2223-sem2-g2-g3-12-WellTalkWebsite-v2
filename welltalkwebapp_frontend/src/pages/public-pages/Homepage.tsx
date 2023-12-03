import { Button } from "@/components/ui/button";

const Homepage = () => {
  return (
    <section className=" h-full flex items-center ">
      <div className=" md:w-[600px] space-y-8">
        <h1 className=" font-bold text-3xl sm:text-5xl tracking-normal text-primary-600 font-serif">
          Elevating Student Support and Mental Health Services at CIT-University
        </h1>
        <p className="block font-sans text-base font-normal leading-relaxed antialiased text-primary-600">
          A website app that can automate and streamline various aspects of the Guidance Center's work, including appointment scheduling, resource sharing, and
          data management.
        </p>
        <div className=" flex items-center space-x-2">
          <Button size="lg" className=" shadow bg-gradient-to-r from-primary-500 to-primary-300 hover:to-primary-500 font-bold ">
            Get mobile app
          </Button>
          <h1 className=" font-semibold text-xs text-primary-700">For students.</h1>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
