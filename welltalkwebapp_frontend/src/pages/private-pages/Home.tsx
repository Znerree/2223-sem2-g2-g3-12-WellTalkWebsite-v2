import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";

type PostsProps = {
  id: number;
  title: string;
  content: string;
  counselor: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

const Home = () => {
  const [allPost, setAllPost] = useState<PostsProps[]>([]);
  const [myPost, setMyPost] = useState<PostsProps[]>([]);
  const [activeButton, setActiveButton] = useState("all");
  const [showPostForm, setShowPostForm] = useState<boolean>(false);
  const [imageFileName, setImageFileName] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [counselor, setCounselor] = useState<any>({});
  const [newPost, setNewPost] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const getCounselor = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await axios.get(`/users/username/${username}`);
      setCounselor(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/posts");
      console.log(response.data);
      setAllPost(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMyPosts = async () => {
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      const response = await axios.get("/myPosts", config);
      console.log(response.data);
      setMyPost(response.data);
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
    getCounselor();
  }, [activeButton]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    console.log(newPost);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPost((prevPost) => ({
        ...prevPost,
        image: file,
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
    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };
    try {
      const response = await axios.post("/posts", newPost, config);
      console.log(response);
      setNewPost({
        title: "",
        content: "",
      });
      alert("Post created!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenPostForm = () => {
    setShowPostForm(true);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
  };

  return (
    <>
      <div className=" ml-72 top-20 absolute">
        <h1 className=" font-semibold">Welcome to Welltalk!</h1>
        <div className=" w-full">
          <div className=" w-96 flex p-3 rounded-xl flex-col bg-secondary bg-opacity-50 shadow mt-2 sticky">
            <input
              type="text"
              placeholder="Create a post"
              className=" cursor-pointer w-full outline-none p-2 rounded-full bg-gray-200 hover:bg-gray-50 "
              onClick={handleOpenPostForm}
            />
            <div onClick={handleOpenPostForm} className=" w-[70px] cursor-pointer mt-2 rounded-lg flex items-center gap-1 bg-secondary p-1 ">
              <RiImageAddFill className=" text-white" />
              <h1 className=" text-sm text-white">Photo</h1>
            </div>
          </div>
          {showPostForm && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
              <div className="w-[550px] bg-white p-3 rounded-lg flex flex-col gap-3 relative">
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
                    placeholder={"What do you want to post today, " + counselor.firstName + "?"}
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
                    <input id="imageUpload" type="file" name="image" className="hidden" onChange={handleImageUpload} />
                  </div>
                  {imageSrc && (
                    <div className="mt-2">
                      <img src={imageSrc} alt="Uploaded Image" className="max-w-full max-h-80 cursor-pointer" onClick={handleImageClick} />
                    </div>
                  )}

                  <button type="submit" className=" mt-5 rounded-full w-full bg-secondary border-inherit text-white p-2 outline-none">
                    Post
                  </button>
                </form>
              </div>
            </div>
          )}
          <nav className=" mt-3 flex gap-2">
            <button
              className={`rounded-full p-2 ${
                activeButton === "all" ? "bg-secondary text-white border-inherit" : "border-secondary border-2 bg-white text-secondary"
              }`}
              onClick={() => {
                setActiveButton("all");
              }}
            >
              All Posts
            </button>
            <button
              className={`rounded-full p-2 ${
                activeButton === "my" ? "bg-secondary text-white border-inherit" : "border-secondary border-2 bg-white text-secondary"
              }`}
              onClick={() => {
                setActiveButton("my");
              }}
            >
              My Posts
            </button>
          </nav>
          {activeButton === "all" && (
            <div className=" w-[950px] flex flex-col items-center mt-2 gap-4 h-[400px] scroll-smooth overflow-auto">
              {allPost.map((post) => (
                <div className=" w-[600px] rounded-lg bg-white border-2 shadow flex p-2 flex-col">
                  <div className=" flex items-center gap-2">
                    <BsPersonCircle size={20} className=" text-gray-500" />
                    <h1 className=" font-bold text-md">
                      {post.counselor.firstName} {post.counselor.lastName}
                    </h1>
                  </div>
                  <h2 className=" font-semibold mt-2">{post.title}</h2>
                  <p className=" mt-3">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
