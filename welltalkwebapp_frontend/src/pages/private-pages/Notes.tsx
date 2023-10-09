import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PiNotePencilBold } from "react-icons/pi";

const Notes = () => {
  const [showAddNote, setShowAddNote] = useState(false);

  const openAddNoteModal = () => {
    setShowAddNote(true);
  };

  const closeAddNoteModal = () => {
    setShowAddNote(false);
  };

  return (
    <>
      <div className=" ml-72 top-20 flex fixed">
        <div className=" flex justify-between w-full absolute">
          <h1 className=" font-semibold">Notes</h1>
          <button
            onClick={openAddNoteModal}
            className=" py-2 flex items-center px-3 bg-primary shadow bg-opacity-90 rounded-full text-white gap-2 hover:bg-opacity-100"
          >
            <PiNotePencilBold size={15} />
            <p>Add a note</p>
          </button>
        </div>
        {showAddNote && (
          <div className=" absolute w-full  h-screen flex items-center justify-center">
            <div className=" bg-white w-[500px] rounded-md h-[520px] shadow-xl border border-3">
              <div className=" bg-primary rounded-tr-md rounded-tl-md py-6 px-3 items-center flex justify-between">
                <h1 className=" text-white font-bold  text-lg">New note</h1>
                <button onClick={closeAddNoteModal} className=" hover:text-tertiary">
                  <IoMdClose />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className=" mt-12 border bg-gray-50 flex  overflow-y-auto h-screen">
          <div className="grid grid-cols-4 gap-2 flex-grow">
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
