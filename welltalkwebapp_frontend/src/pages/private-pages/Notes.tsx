import { PiNotePencilBold } from "react-icons/pi";

const Notes = () => {
  return (
    <>
      <div className=" ml-72 top-20 flex fixed">
        <h1 className=" font-semibold sticky top-0 border-b">Notes</h1>
        <div className=" mt-10 flex  overflow-y-auto h-screen">
          <div className="grid grid-cols-4 gap-2 flex-grow">
            <div className=" p-4 justify-center flex flex-col items-center w-60">
              <button className=" flex items-center bg-primary shadow bg-opacity-90 p-3 rounded-full text-white gap-2 hover:bg-opacity-100">
                <PiNotePencilBold size={15} className=" " />
                <p>Add a note</p>
              </button>
            </div>

            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow border w-72 h-72">
              <h2 className="text-lg font-semibold mb-2">Note 1</h2>
              <p>This is note 1 sddddddddddd.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notes;
