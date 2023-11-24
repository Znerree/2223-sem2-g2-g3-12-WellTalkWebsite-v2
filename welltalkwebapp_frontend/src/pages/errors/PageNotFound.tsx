import notFoundimg from "@/media/images/notfound.png";

const PageNotFound = () => {
  return (
    <>
      <div className=" h-screen w-full flex items-center justify-center">
        <span className=" pr-0 mx-10 w-auto text-center">
          <img className=" md:h-96 md:w-96" src={`${notFoundimg}`} alt="Not found page image" />
          <h1 className=" text-6xl font-bold">404</h1>
          <h1 className=" text-3xl font-bold">Page Not Found</h1>
        </span>
      </div>
    </>
  );
};

export default PageNotFound;
