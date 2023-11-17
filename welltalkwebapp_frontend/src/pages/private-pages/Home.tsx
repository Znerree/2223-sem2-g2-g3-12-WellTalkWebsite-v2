import axios from "@/api/axios";
import React, { useEffect, useState, useRef } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import useFetchUser from "@/hooks/useFetchUser";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Man_Avatar from "@/assets/images/man_avatar.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideImagePlus } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import { ProgressBar, Spinner } from "@/components/Loaders";
import { useForm } from "react-hook-form";
import PostCard from "@/components/post/post-card";
import { Post } from "@/types/post";
import PostForm from "@/components/post/post-form";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const [allPost, setAllPost] = useState<Post[]>([]);
  const [myPost, setMyPost] = useState<Post[]>([]);
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
  const form = useForm();

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
      <div className=" w-full flex flex-col">
        <Card className=" w-full md:w-[700px] mx-auto mb-3">
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

        <Card className=" md:w-[700px] w-full mx-auto mb-3">
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
            <Card className="w-[600px] mx-2">
              <CardHeader className=" text-center text-2xl font-semibold">
                <span className=" flex justify-between items-center">
                  Create post
                  <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full p-1" asChild>
                    <IoMdClose onClick={() => setShowPostForm(false)} />
                  </Button>
                </span>
              </CardHeader>
              <CardContent>
                <PostForm />
              </CardContent>
            </Card>
          </div>
        )}

        <>
          {/* Conditionally displays all the posts */}
          {activeButton === "all" && (
            <>
              {allPost.map((post) => (
                <React.Fragment key={post.id}>
                  <PostCard
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    photoContent={post.photoContent}
                    photoData={post.photoData}
                    counselor={post.counselor}
                    activeBtn="all"
                  />
                </React.Fragment>
              ))}
            </>
          )}

          {/* Conditionally displays the user's posts */}
          {activeButton === "my" && (
            <>
              {myPost.map((post) => (
                <React.Fragment key={post.id}>
                  <>
                    <PostCard
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      photoContent={post.photoContent}
                      photoData={post.photoData}
                      counselor={post.counselor}
                      activeBtn="my"
                      showDeleteModal={() => handleOpenConfirmDelete(post.id)}
                      showEdit={() => handleOpenEditForm(post.id)}
                      saveChanges={() => handleEditPost}
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
                </React.Fragment>
              ))}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Home;
