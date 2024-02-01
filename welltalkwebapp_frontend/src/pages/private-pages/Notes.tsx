import axios, { STUDENT_BASE_API } from "@/api/axios";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { PiNotePencil, PiNotePencilBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { StudentJournalType } from "@/types/student-journal";
import { set } from "date-fns";
import JournalCard from "@/components/student/journal-card";
import { Student } from "@/types/student";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

type NotesProps = {
  id: number;
  title: string;
  content: string;
  color: string;
};

const Notes = () => {
  const [userNotes, setUserNotes] = useState<NotesProps[]>([]);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresher, setRefresher] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newNote, setNewNote] = useState<NotesProps>({
    id: 0,
    title: "",
    content: "",
    color: "",
  });
  const [editingNote, setEditingNote] = useState<NotesProps>({
    id: 0,
    title: "",
    content: "",
    color: "",
  });
  const [journals, setJournals] = useState<StudentJournalType[]>([]);
  const [author, setAuthor] = useState<Student[]>([]);

  const alertDialogRef = useRef<HTMLButtonElement>(null);

  const fetchNotes = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      setLoading(true);
      const response = await axios.get("/myNotes", config);
      const sortedNotes = response.data.sort((a: NotesProps, b: NotesProps) => {
        return b.id - a.id;
      });
      setUserNotes(sortedNotes);
      setSelectedNote(sortedNotes[0]?.id || null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refresher]);

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditingNote({
      ...editingNote,
      [name]: value,
    });
  };

  const handleSubmitEdit = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      setLoading(true);
      await axios.put(`/notes/${editingNote.id}`, editingNote, config);
      setIsEditing(false);
      setRefresher(refresher + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNewNote = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    const body = {
      title,
      content,
    };
    try {
      setLoading(true);
      await axios.post(`/notes`, body, config);
      setTitle("");
      setContent("");
      setRefresher(refresher + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      setLoading(true);
      await axios.delete(`/notes/${selectedNote}`, config);
      setRefresher(refresher + 1);
      alertDialogRef.current?.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAllStudentJournal = async () => {
      try {
        setLoading(true);
        const journals = await axios.get(STUDENT_BASE_API + `/getAll`);
        const publicJournals = journals.data.filter((journal: any) => journal.type === "Public");
        const journalsWithAuthor = await Promise.all(
          publicJournals.map(async (journal: any) => {
            const author = await axios.get(STUDENT_BASE_API + `/user/${journal.userid}`);
            return { ...journal, author: author.data };
          })
        );
        setJournals(journalsWithAuthor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllStudentJournal();
  }, []);

  return (
    <div className=" max-h-screen w-full flex justify-between">
      <div className=" w-[500px] overflow-x-hidden">
        <span className=" flex justify-between items-center mb-5 px-8">
          <h1 className="sticky top-0 font-semibold text-2xl text-primary-900">My Notes</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <PiNotePencil className="h-6 w-6 text-primary-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>New Note</AlertDialogTitle>
              <Input
                type="text"
                name="title"
                className="w-full border border-neutral-200 rounded-md p-2 mt-4"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                name="content"
                className="w-full border border-neutral-200 rounded-md p-2 mt-4 resize-none h-96"
                placeholder="Note"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={handleSubmitNewNote} disabled={loading}>
                    Save
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </span>
        <ul>
          {userNotes.map((note) => (
            <li
              key={note.id}
              className={`border h-20 cursor-pointer hover:shadow px-8 py-2 ${selectedNote === note.id ? "bg-neutral-100" : ""}`}
              onClick={() => {
                if (!isEditing) {
                  setSelectedNote(note.id);
                }
              }}
            >
              <h1 className="font-medium md:text-lg">{note.title ? (note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title) : "Untitled"}</h1>
              <p className="text-slate-700 md:text-sm text-ellipsis whitespace-nowrap ">
                {note.content ? (note.content.length > 40 ? note.content.slice(0, 40) + "..." : note.content) : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Separator orientation="vertical" />

      <div className=" w-full max-h-screen ">
        {userNotes.map((note) => (
          <div key={note.id} className={`h-full container ${selectedNote === note.id ? "" : "hidden"}`}>
            <span className=" w-full flex justify-end container">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className=" text-red-500" variant={"link"}>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone. This note will be deleted.</AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel ref={alertDialogRef}>Cancel</AlertDialogCancel>
                    <Button variant={"destructive"} onClick={() => handleDeleteNote()} disabled={loading}>
                      {loading ? " Deleting..." : "Delete"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {isEditing ? (
                <Button className=" rounded-md px-5" size={"sm"} onClick={handleSubmitEdit} disabled={loading}>
                  {loading ? " Saving..." : "Save"}
                </Button>
              ) : (
                <Button className=" rounded-md px-5" size={"sm"} disabled>
                  Save
                </Button>
              )}
            </span>
            {isEditing && (
              <>
                <Input
                  type="text"
                  name="title"
                  className="w-full border border-neutral-200 rounded-md p-2 mt-4"
                  placeholder="Title"
                  value={editingNote.title}
                  onChange={handleEditInputChange}
                />
                <Textarea
                  name="content"
                  className="w-full border border-neutral-200 rounded-md p-2 mt-4 resize-none h-96"
                  placeholder="Note"
                  value={editingNote.content}
                  onChange={handleEditInputChange}
                />
                <div className="flex justify-end mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={loading} className="rounded-md px-5 mr-2" size={"sm"} variant={"destructive"}>
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription> All your unsaved changes will be lost. </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button variant={"destructive"} onClick={() => setIsEditing(false)} disabled={loading}>
                            Ok
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
            {!isEditing && (
              <div className="flex flex-col h-full">
                <h1
                  className="text-2xl font-semibold text-primary-900"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingNote({
                      id: note.id,
                      title: note.title,
                      content: note.content,
                      color: note.color,
                    });
                  }}
                >
                  {note.title}
                </h1>
                <p
                  className="text-slate-700 mt-4 overflow-y-auto max-h-[500px]"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingNote({
                      id: note.id,
                      title: note.title,
                      content: note.content,
                      color: note.color,
                    });
                  }}
                >
                  {note.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className=" w-[650px] max-h-full">
        <h1 className=" text-lg font-semibold text-center mb-4">Student Journals</h1>
        {journals.map((journal) => (
          <div key={journal.journalID}>
            <JournalCard
              date={journal.date}
              mood={journal.mood}
              title={journal.title}
              message={journal.message}
              userid={journal.userid}
              author={journal.author}
              authorFname={journal.author.firstName}
              authorLname={journal.author.lastName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notes;
