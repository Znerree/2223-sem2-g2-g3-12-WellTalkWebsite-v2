import axios from "@/api/axios";
import CounselorLayout from "@/app/layout/Layout";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { PiNotePencilBold } from "react-icons/pi";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

type NotesProps = {
  id?: number;
  title: string;
  content: string;
  color: string;
};

const Notes = () => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [userNotes, setUserNotes] = useState<NotesProps[]>([]);
  const [displayClickedNote, setDisplayClickedNote] = useState<number | null>(null);
  const [clickedNoteId, setClickedNoteId] = useState<number | null>(null);
  const [newNote, setNewNote] = useState<NotesProps>({
    title: "",
    content: "",
    color: "",
  });
  const [editingNote, setEditingNote] = useState<{ title: string; content: string; color: string }>({
    title: "",
    content: "",
    color: "",
  });
  const [refresher, setRefresher] = useState(0);
  const [showEditNote, setShowEditNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //fetch user notes
  const fetchCurrentUserNotes = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.get("/myNotes", config);
      const sortedNotes = response.data.sort((a: any, b: any) => b.id - a.id);
      setUserNotes(sortedNotes);
      if (sortedNotes.length > 0) setDisplayClickedNote(sortedNotes[0].id);
      setClickedNoteId(sortedNotes[0].id);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrentUserNotes();
  }, [refresher]);

  const handleNoteClick = (noteId: number) => {
    const noteToEdit = userNotes.find((note) => note.id === noteId);

    if (noteToEdit) {
      if (noteId !== clickedNoteId) setShowEditNote(false);
      setClickedNoteId(noteId);
      setDisplayClickedNote(noteId);
      setEditingNote({
        title: noteToEdit.title,
        content: noteToEdit.content,
        color: noteToEdit.color,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
    console.log(newNote);
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleNewNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      const color = getRandomColor();
      const response = await axios.post("/notes", { ...newNote, color: color }, config);
      alert("Note created successfully");
      setNewNote({
        title: "",
        content: "",
        color: color,
      });
      console.log(response.data);
      setRefresher(Math.random());
    } catch (error) {
      console.log(error);
    }
    closeAddNoteModal();
  };

  const openAddNoteModal = () => {
    setShowAddNote(true);
  };

  const closeAddNoteModal = () => {
    setShowAddNote(false);
  };

  const handleSaveEditedNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    const body = {
      title: editingNote.title,
      content: editingNote.content,
    };

    try {
      const noteid = clickedNoteId;
      const response = await axios.put(`/notes/${noteid}`, body, config);
      setEditingNote({
        title: "",
        content: "",
        color: "",
      });
      setRefresher(Math.random());
      console.log(response.data);
      alert("Note updated successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setShowEditNote(false);
  };

  return (
    <>
      <div className=" absolute bottom-0 right-0 pb-8 pr-8">
        <button
          onClick={openAddNoteModal}
          className=" overflow-hidden py-2 flex items-center px-3 bg-tertiary shadow bg-opacity-90 rounded-full text-white hover:bg-opacity-100 hover:shadow-md"
        >
          <PiNotePencilBold size={15} />
          <p>Add a note</p>
        </button>
      </div>

      {showAddNote && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
          <div className="w-[550px] max-h-[500px] overflow-auto bg-white p-3 rounded-lg flex flex-col gap-3 relative">
            <button className="text-tertiary hover:text-primary text-xl px-4 py-2 absolute top-0 right-0" onClick={closeAddNoteModal}>
              <IoMdClose />
            </button>
            <p className="text-xl font-bold text-center py-4">New note</p>
            <form onSubmit={handleNewNote}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                className="w-full border-secondary border-2 rounded-md p-2 mb-2 outline-none"
                placeholder="Add title here"
                required
              />
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                value={newNote.content}
                onChange={handleInputChange}
                className="w-full border-secondary border-2 resize-none rounded-md p-2 mb-2 outline-none auto-cols-auto"
                placeholder="Add note content here..."
                rows={4}
                required
              />

              <button type="submit" className=" rounded-full w-full bg-secondary border-inherit text-white p-2 outline-none">
                Create note
              </button>
            </form>
          </div>
        </div>
      )}

      {userNotes.length > 0 ? (
        <>
          <div className=" w-full h-full flex overflow-auto">
            <div className=" w-2/5 border-r shadow-md overflow-y-auto ">
              <h1 className="text-2xl font-semibold p-3">My notes</h1>
              {userNotes.map((note: any) => (
                <div
                  key={note.id}
                  onClick={() => handleNoteClick(note.id)}
                  className={`p-3 border-t border-b h-1/6 cursor-pointer hover:shadow-lg hover:border-secondary ${
                    clickedNoteId === note.id ? "bg-gray-200" : ""
                  }`}
                  style={{ backgroundColor: note.color }}
                >
                  <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
                  {note.content.length > 50 ? (
                    <p className="break-words text-justify mb-2 text-ellipsis">
                      {note.content.slice(0, 50)}
                      <span className=" text-base font-medium"> .... </span>
                    </p>
                  ) : (
                    <p className="break-words text-justify mb-2 text-ellipsis">{note.content}</p>
                  )}
                </div>
              ))}
            </div>
            {displayClickedNote && !showEditNote && (
              <div className=" w-3/5 container flex flex-col h-full overflow-auto" key={clickedNoteId}>
                {userNotes
                  .filter((note: any) => note.id === clickedNoteId) // Filter for the clicked note
                  .map((note: any) => (
                    <div key={note.id}>
                      <div className="flex w-full justify-end text-sm items-center my-3">
                        <button className=" flex items-center gap-1 text-blue-500" onClick={() => setShowEditNote(note.id)}>
                          <FaRegEdit />
                          Edit
                        </button>
                      </div>
                      <h1 className="text-2xl font-semibold">{note.title}</h1>
                      <textarea disabled={!isEditing} className="break-words text-justify w-full  h-screen">
                        {note.content}
                      </textarea>
                      {showEditNote && (
                        <div className={`w-3/5 container flex flex-col overflow-y-hidden ${!displayClickedNote ? "hidden" : ""}`}>
                          {userNotes
                            .filter((note: any) => note.id === clickedNoteId)
                            .map((note: any) => (
                              <div key={note.id}>
                                <form onSubmit={() => handleSaveEditedNote} className="flex w-full justify-end text-sm gap-2 items-center my-3">
                                  <button type="submit" className=" flex items-center gap-1 text-white rounded-md py-1 px-2 bg-green-500">
                                    Save
                                  </button>
                                  <button className=" flex items-center gap-1 text-red-500" onClick={() => setShowEditNote(false)}>
                                    Cancel
                                  </button>

                                  <span className=" flex flex-col">
                                    <input
                                      onChange={handleEditInputChange}
                                      type="text"
                                      name="title"
                                      placeholder="Title"
                                      className="text-2xl font-semibold outline-none bg-gray-50"
                                      value={editingNote.title}
                                    />
                                    <input
                                      onChange={handleEditInputChange}
                                      name="content"
                                      type="text"
                                      placeholder="Content"
                                      className="break-words text-justify outline-none bg-gray-50"
                                      value={editingNote.content}
                                    />
                                  </span>
                                </form>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {showEditNote && (
              <div className={`w-3/5 container flex flex-col ${!displayClickedNote ? "hidden" : ""}`}>
                {userNotes
                  .filter((note: any) => note.id === clickedNoteId)
                  .map((note: any) => (
                    <div key={note.id}>
                      <form onSubmit={handleSaveEditedNote}>
                        <span className=" w-full flex items-center gap-2x justify-end">
                          <button type="submit" className=" flex items-center gap-1 text-white rounded-md py-1 px-2 bg-green-500">
                            Save
                          </button>
                          <button className=" flex items-center text-red-500" onClick={() => setShowEditNote(false)}>
                            Cancel
                          </button>
                        </span>
                        <span className=" flex flex-col">
                          <input
                            onChange={handleEditInputChange}
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="text-2xl font-semibold outline-none bg-gray-50"
                            value={editingNote.title}
                          />
                          <input
                            onChange={handleEditInputChange}
                            name="content"
                            type="text"
                            placeholder="Content"
                            className="break-words outline-none bg-gray-50 h-full"
                            value={editingNote.content}
                          />
                        </span>
                      </form>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full mt-40">
          <p className="text-center text-2xl font-semibold mt-10">You have no notes yet</p>
        </div>
      )}

      {/* {displayClickedNote && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
          <div className="h-[500px] bg-white w-[450px] overflow-auto rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold p-4">Note</h1>
              <button className="text-tertiary hover:text-primary text-xl px-4 py-2" onClick={() => setDisplayClickedNote(false)}>
                <IoMdClose />
              </button>
            </div>
            {userNotes
              .filter((note: any) => note.id === clickedNoteId) // Filter for the clicked note
              .map((note: any) => (
                <div className="flex justify-between px-3 flex-col" key={note.id}>
                  <h1 className="text-2xl font-semibold">{note.title}</h1>
                  {note.id === clickedNoteId && (
                    <div key={note.id}>
                      <p className="break-words text-justify">{note.content}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )} */}
    </>
  );
};
export default Notes;
