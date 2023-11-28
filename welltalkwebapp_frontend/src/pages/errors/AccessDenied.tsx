import accessDeniedimg from "@/media/images/accessdeniedimg.png";

export const AccessDenied = () => {
  return (
    <>
      <div className=" h-screen w-full flex items-center justify-center">
        <span className=" pr-0 mx-10 w-auto text-center">
          <img className=" md:h-96 md:w-96" src={`${accessDeniedimg}`} alt="Access denied image" />
          <h1 className=" text-6xl font-bold">403</h1>
          <h1 className=" text-3xl font-bold">Access Denied</h1>
          <p className=" text-xl font-bold">You are not authorized to access this page.</p>
        </span>
      </div>
    </>
  );
};
