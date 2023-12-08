import axios from "@/api/axios";
import React, { useEffect, useState, useRef } from "react";
import { AiFillHome, AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import useFetchUser from "@/hooks/useFetchUser";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Man_Avatar from "@/media/images/man_avatar.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideImagePlus } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import { ProgressBar, Spinner } from "@/components/Loaders";
import { useForm } from "react-hook-form";
import { Post } from "@/types/post";
import PostForm from "@/components/post/PostForm";
import { IoClose } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaRegComment } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

import PostSkeleton from "@/components/post/PostSkeleton";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import PostMenu from "@/components/post/PostMenu";
import { Toaster } from "@/components/ui/toaster";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Home = () => {
  const [allPost, setAllPost] = useState<Post[]>([]);
  const [myPost, setMyPost] = useState<Post[]>([]);
  const [activeButton, setActiveButton] = useState("all");
  const [showPostOptions, setShowPostOptions] = useState<number | null>(null);
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

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const postApi = activeButton === "all" ? "/posts" : "/myPosts";
      try {
        const config = {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        };
        const response = await axios.get(`${postApi}`, config);
        const sortedPosts = response.data.sort((a: any, b: any) => b.id - a.id);
        console.log(response.data);
        setLoading(false);
        setAllPost(sortedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [activeButton]);

  // const getMyPosts = async () => {
  //   const config = {
  //     headers: { Authorization: `${localStorage.getItem("token")}` },
  //   };
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("/myPosts", config);
  //     const sortedUserPosts = response.data.sort((a: any, b: any) => b.id - a.id);
  //     console.log(response.data);
  //     setMyPost(sortedUserPosts);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
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
      <Card className=" md:w-[700px] mx-auto mb-3">
        <CardContent className=" flex flex-row items-center px-3 py-5 gap-2">
          <Avatar>
            <AvatarImage className=" rounded-full" src={Man_Avatar} />
            <AvatarFallback className=" border h-6 w-6">WT</AvatarFallback>
          </Avatar>
          <AlertDialog>
            <AlertDialogTrigger className=" w-full rounded-md">
              <Input placeholder="Post something..." className=" cursor-pointer hover:bg-gray-100 bg-gray-50" />
            </AlertDialogTrigger>

            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <LucideImagePlus className="h-6 w-6 text-gray-400 " />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className=" flex flex-row items-center justify-between">
                  <h1 className=" text-xl font-semibold text-primary-500">Create a post</h1>
                  <AlertDialogCancel asChild type="button" className=" h-12 w-12 text-slate-500 border-none hover">
                    <Button variant="ghost" size="icon">
                      <IoClose className="h-6 w-6" />
                    </Button>
                  </AlertDialogCancel>
                </div>
              </AlertDialogHeader>
              <PostForm />
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card className=" md:w-[700px] mx-auto mb-3">
        <CardContent className=" flex flex-row items-center py-3 px-3 gap-3">
          <Button
            property="active"
            onClick={() => setActiveButton("all")}
            variant="ghost"
            size="icon"
            className={`rounded-full h-8 w-auto flex flex-row gap-1 px-2 hover:text-primary-500  ${
              activeButton === "all" ? "text-primary-500 hover:text-primary-500 bg-primary-100" : "text-gray-400"
            }`}
          >
            <AiOutlineHome className="h-5 w-5" /> All posts
          </Button>
          <Button
            property="active"
            onClick={() => setActiveButton("my")}
            variant="ghost"
            size="icon"
            className={`rounded-full h-8 w-auto flex flex-row gap-1 px-2 hover:text-primary-500  ${
              activeButton === "my" ? "text-primary-500 hover:text-primary-500 bg-primary-100" : "text-gray-400"
            }`}
          >
            <BsPerson className="h-5 w-5" /> My posts
          </Button>
        </CardContent>
      </Card>

      {loading ? (
        <PostSkeleton />
      ) : (
        <>
          {allPost.map((post) => (
            <Card key={post.id} className=" mx-auto mb-3 md:w-[700px]">
              <CardHeader className=" p-1 mx-2 w-full">
                <div className=" flex p-3 gap-2 items-center">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/300" loading="lazy" />
                  </Avatar>
                  <span className=" flex-1">
                    <CardTitle className=" text-lg">
                      {post.counselor.firstName} {post.counselor.lastName}
                    </CardTitle>

                    <CardDescription className=" text-xs border-b-transparent border-b hover:border-b-inherit w-min">{post.counselor.userType}</CardDescription>
                  </span>
                  {activeButton === "my" ? <PostMenu postid={post.id} /> : null}
                </div>
              </CardHeader>

              <CardContent className=" space-y-2 px-0">
                <CardTitle className=" text-lg font-semibold px-5">{post.title}</CardTitle>
                <CardDescription className=" text-sm px-5">{post.content}</CardDescription>
                {post.photoContent && <img src={`data:image/png;base64,${post.photoContent}`} alt="posted image" className=" w-full" loading="lazy" />}
              </CardContent>
              <CardFooter className=" p-0 mb-1 flex-col">
                <div className=" w-full flex justify-between py-1 border-y mx-2 text-slate-400">
                  <Button className=" flex-grow space-x-1" variant={"ghost"}>
                    <AiOutlineHeart className="h-5 w-5" /> <p>Like</p>
                  </Button>
                  <Button className=" flex-grow space-x-1" variant={"ghost"}>
                    <FaRegCommentAlt className="h-4 w-4" /> <p>Comment</p>
                  </Button>
                </div>
                <div className=" my-2 w-full flex space-x-2 px-2">
                  <Input className=" rounded-l-full rounded-r-full bg-gray-50 hover:bg-gray-100 cursor-pointer flex-grow" placeholder="Comment..." />
                  <Button className=" rounded-r-full" variant="default">
                    Comment
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default Home;
