const ListOfAppointments = () => {
  return (
    <>
      <h1 className=" font-semibold text-md border-b sticky top-0 bg-white py-4 pl-2">
        List of Appointments
      </h1>
      <ul className=" p-2">
        <li className=" border-b px-2 rounded-md shadow-sm py-2 border">
          <p>Jake Errenz</p>
          <div className=" flex gap-2">
            <p className=" text-gray-300 text-sm">
              Date: <span className="text-primary">June 10, 2020</span>
            </p>
            <p className=" text-gray-300 text-sm">
              Time: <span className="text-primary">10:00 am</span>
            </p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ListOfAppointments;
