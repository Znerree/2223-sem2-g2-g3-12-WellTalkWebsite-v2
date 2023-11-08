import axios from "@/api/axios";
import { useEffect, useState, useRef } from "react";
import { AiFillHome, AiOutlineHeart, AiOutlineHome, AiTwotoneHome } from "react-icons/ai";
import { BsPerson, BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line, RiImageAddFill } from "react-icons/ri";
import { MdOutlineModeEdit, MdPostAdd } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useFetchUser from "@/hooks/useFetchUser";
import Posts from "@/components/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Man_Avatar from "@/assets/images/man_avatar.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideImagePlus } from "lucide-react";
import { PostsProps } from "@/components/PostCard";
import useLoading from "@/hooks/useLoading";
import { ProgressBar, Spinner } from "@/components/Loaders";

const Home = () => {
  const [allPost, setAllPost] = useState<PostsProps[]>([]);
  const [myPost, setMyPost] = useState<PostsProps[]>([]);
  const [activeButton, setActiveButton] = useState("all");
  const [showPostForm, setShowPostForm] = useState<boolean>(false);
  const [imageFileName, setImageFileName] = useState<string>("");
  const [imageSrc, setImageSrc] = useState("");
  const [showPostOptions, setShowPostOptions] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<{ title: string; content: string; photoData: File }>({
    title: "",
    content: "",
    photoData: new File([], ""),
  });
  const [editingPost, setEditingPost] = useState<{ title: string; content: string; photoData: File }>({
    title: "",
    content: "",
    photoData: new File([], ""),
  });

  const postOptionsRef = useRef<HTMLDivElement>(null);

  const { user } = useFetchUser();
  const { loading, setLoading } = useLoading();

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/posts");
      const sortedPosts = response.data.sort((a: any, b: any) => b.id - a.id);
      console.log(response.data);
      setLoading(false);
      setAllPost(sortedPosts);
    } catch (err) {
      console.error(err);
    }
  };

  const getMyPosts = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      setLoading(true);
      const response = await axios.get("/myPosts", config);
      const sortedUserPosts = response.data.sort((a: any, b: any) => b.id - a.id);
      console.log(response.data);
      setMyPost(sortedUserPosts);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeButton === "all") {
      getAllPosts();
    } else {
      getMyPosts();
    }
  }, [activeButton]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    console.log(newPost);
  };

  const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditingPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    console.log(editingPost);
  };

  const handleEditImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditingPost((prevPost) => ({
        ...prevPost,
        photoData: file,
      }));

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        setImageSrc(imageSrc);
      };
      reader.readAsDataURL(file);
      setImageFileName(file.name);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPost((prevPost) => ({
        ...prevPost,
        photoData: file,
      }));

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        setImageSrc(imageSrc);
      };
      reader.readAsDataURL(file);
      setImageFileName(file.name);
    }
  };

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    input.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //formData is used for posting with photos
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("photoData", newPost.photoData);
    console.log(newPost.photoData);

    //body is used for posting without photos
    const body = {
      title: newPost.title,
      content: newPost.content,
    };

    //headers is used for authorization
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      if (newPost.photoData.name === "") {
        const response = await axios.post("/posts", body, config);
        console.log(response);
      } else {
        const response = await axios.post("/posts/photo", formData, config);
        console.log(response);
        setNewPost({
          title: "",
          content: "",
          photoData: new File([], ""),
        });
      }
      alert("Post created!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (postOptionsRef.current && !postOptionsRef.current.contains(event.target as Node)) {
        setShowPostOptions(null);
      }
    };

    if (showPostOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPostOptions]);

  const handleOpenConfirmDelete = (postId: number) => {
    myPost.find((post) => post.id === postId);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleOpenPostForm = () => {
    setShowPostForm(true);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  const handleDeletePost = async (id: number) => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      const response = await axios.delete(`/posts/${id}`, config);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditForm = (postId: number) => {
    const post = myPost.find((post) => post.id === postId);
    if (post) {
      setEditingPost({
        title: post.title,
        content: post.content,
        photoData: new File([], ""),
      });
      setShowEditForm(true);
      console.log(post);
    }
  };

  const handleCloseEditForm = () => {
    setEditingPost({
      title: "",
      content: "",
      photoData: new File([], ""),
    });
    setShowEditForm(false);
  };

  const handleEditPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //formData is used for posting with photos
    const formData = new FormData();
    formData.append("title", editingPost.title);
    formData.append("content", editingPost.content);
    formData.append("photoData", editingPost.photoData);
    console.log(editingPost.photoData);

    //body is used for posting without photos
    const body = {
      title: editingPost.title,
      content: editingPost.content,
    };

    //headers is used for authorization
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    try {
      let response;
      const postId = myPost.find((post) => post.id === showPostOptions)?.id;
      if (editingPost?.photoData?.name === "") {
        // Update post without photo
        response = await axios.put(`/posts/${postId}`, body, config);
      } else {
        // Update post with photo
        response = await axios.put(`/posts/photo/${postId}`, formData, config);
        console.log(response);
        setEditingPost({
          title: "",
          content: "",
          photoData: new File([], ""),
        });
      }
      console.log(response);
      alert("Post updated!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card className=" md:w-[700px] mx-auto mb-3">
        <CardContent className=" flex flex-row items-center px-3 py-5 gap-2">
          <Avatar>
            <AvatarImage className=" rounded-full" src={Man_Avatar} />
            <AvatarFallback className=" border h-6 w-6">WT</AvatarFallback>
          </Avatar>
          <Input
            className=" w-full bg-gray-200 cursor-pointer hover:border hover:border-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Post something..."
            onClick={handleOpenPostForm}
          />
          <Button variant="ghost" size="icon">
            <LucideImagePlus className="h-6 w-6 text-gray-400" onClick={handleOpenPostForm} />
          </Button>
        </CardContent>
      </Card>

      <Card className=" md:w-[700px] mx-auto mb-3">
        <CardContent className=" flex flex-row items-center py-3 px-3 gap-3">
          <Button
            property="active"
            onClick={() => setActiveButton("all")}
            variant="ghost"
            size="icon"
            className={`rounded-full h-8 w-auto flex flex-row gap-1 px-2 font-bold hover:text-gray-400 ${
              activeButton === "all" ? "text-blue-500 hover:text-blue-500 bg-gray-200" : "text-gray-400"
            }`}
          >
            {activeButton === "all" ? <AiFillHome className="h-5 w-5" /> : <AiOutlineHome className="h-5 w-5" />} <p>All posts</p>
          </Button>

          <Button
            onClick={() => setActiveButton("my")}
            variant="ghost"
            size="icon"
            property="active"
            className={`rounded-full h-8 w-auto flex flex-row gap-1 px-2 font-bold hover:text-gray-400 ${
              activeButton === "my" ? "text-blue-500 hover:text-blue-500 bg-gray-200" : "text-gray-400"
            }`}
          >
            {activeButton === "my" ? <BsPersonFill className="h-5 w-5" /> : <BsPerson className="h-5 w-5" />} <p>Your posts</p>
          </Button>
        </CardContent>
      </Card>

      {/* Conditionally displays the form to create a new post */}
      {showPostForm && (
        <div className="fixed inset-0 w-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
          <div className="w-[550px] max-h-[500px] overflow-auto bg-white p-3 rounded-lg flex flex-col gap-3 relative">
            <button onClick={handleClosePostForm} className="text-tertiary hover:text-primary text-xl px-4 py-2 absolute top-0 right-0">
              <IoMdClose />
            </button>
            <p className="text-xl font-bold text-center py-4">Create post</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                className="w-full border-secondary border-2 rounded-md p-2 mb-2 outline-none"
                placeholder="Title"
                required
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                className="w-full border-secondary border-2 resize-none rounded-md p-2 mb-2 outline-none"
                placeholder={"What do you want to post today, " + user?.firstName + "?"}
                rows={4}
                required
              />
              <div className="flex justify-between">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer border-secondary border-2 rounded-md p-2 text-sm outline-none flex items-center gap-1 text-tertiary"
                >
                  <RiImageAddFill />
                  {imageSrc ? imageFileName : "Upload an Image"}
                </label>
                <input id="imageUpload" type="file" name="photoData" className="hidden" onChange={handleImageUpload} />
              </div>
              {imageSrc && (
                <div className="mt-2">
                  <img src={imageSrc} alt="Uploaded Image" className="max-w-auto max-h-auto cursor-pointer" onClick={handleImageClick} />
                </div>
              )}

              <button type="submit" className=" mt-5 rounded-full w-full bg-secondary border-inherit text-white p-2 outline-none">
                Post
              </button>
            </form>
          </div>
        </div>
      )}
      {loading ? <Spinner /> : null}
      {!loading && (
        <div className=" w-full flex gap-3 flex-col">
          {/* Conditionally displays all the posts */}
          {activeButton === "all" && (
            <>
              {allPost.map((post) => (
                <Posts
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  photoContent={post.photoContent}
                  photoData={post.photoData}
                  counselor={post.counselor}
                  activeBtn="all"
                />
              ))}
            </>
          )}

          {/* Conditionally displays the user's posts */}
          {activeButton === "my" && (
            <>
              {allPost.map((post) => (
                <>
                  <Posts
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    photoContent={post.photoContent}
                    photoData={post.photoData}
                    counselor={post.counselor}
                    activeBtn="my"
                    showDeleteModal={() => handleOpenConfirmDelete(post.id)}
                  />
                  {showDeleteModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-10">
                      <div className="bg-white rounded-lg p-4 flex flex-col">
                        <h1 className=" text-black font-semibold text-lg">Delete</h1>
                        <p className=" text-gray-500  border-t border-b py-4 px-1 my-3">Are you sure you want to delete this post?</p>
                        <div className="flex justify-end mt-4">
                          <button onClick={handleCancelDelete} className="text-sm text-gray-500 hover:text-primary mr-2">
                            Cancel
                          </button>
                          <button onClick={() => handleDeletePost(post.id)} className="text-sm text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
