import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { Input } from "../ui/input";
import Man_Avatar from "@/assets/images/man_avatar.svg";
import { RiMoreFill } from "react-icons/ri";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import axios from "@/api/axios";
import { Textarea } from "../ui/textarea";
import { Post } from "@/types/post";

const PostCard = ({ title, content, photoContent, activeBtn, counselor, showDeleteModal, showEdit, photoData }: Post) => {
  const [post, setPost] = useState<Post[]>([]);
  const [myPost, setMyPost] = useState<Post[]>([]);
  const [imageFileName, setImageFileName] = useState("");
  const [editingPost, setEditingPost] = useState<Post>({} as Post);
  const [imageSrc, setImageSrc] = useState("");
  const userInitials = counselor.firstName.charAt(0) + counselor.lastName.charAt(0);
  const form = useForm();

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

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    input.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditingPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    console.log(editingPost);
  };

  useEffect(() => {
    setImageSrc(`data:image/jpeg;base64,${photoContent}`);
  }, [post]);

  const handleEditPost = async (event: any) => {
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
      const postId = editingPost.id;
      if (editingPost?.photoData?.name === "") {
        // Update post without photo
        response = await axios.put(`/posts/${postId}`, body, config);
      } else {
        // Update post with photo
        response = await axios.put(`/posts/photo/${postId}`, formData, config);
        console.log(response);
        setEditingPost({
          ...editingPost,
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

  const handleUpdateInputChange = (event: any) => {
    const { name, value } = event.target;
    setEditingPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    console.log(editingPost);
  };
  return (
    <>
      <Card className="md:w-[700px] w-full mx-auto mb-3 ">
        <CardHeader className=" p-0">
          <span className=" flex justify-between p-3 gap-2">
            <Avatar className=" h-12 w-12">
              <AvatarImage src={Man_Avatar} alt="Avatar" className=" h-12 w-12 rounded-full shadow" />
              <AvatarFallback className=" border" delayMs={100}>
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <span className=" flex-1">
              <CardTitle className=" text-lg cursor-pointer">
                {counselor.firstName} {counselor.lastName}
              </CardTitle>

              <CardDescription className=" text-xs border-b-transparent border-b hover:border-b-inherit w-min cursor-pointer">
                {counselor.userType}
              </CardDescription>
            </span>
            <div>
              {activeBtn === "my" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"} className=" rounded-full">
                      <RiMoreFill className=" h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" side="left" align="start" alignOffset={30} sideOffset={0}>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className=" space-y-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={"ghost"} className=" cursor-pointer w-full flex justify-start text-sm" onClick={showEdit}>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit post</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form className="space-y-2" onSubmit={form.handleSubmit(handleEditPost)}>
                              <FormField
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Title" {...field} defaultValue={editingPost.title} onChange={handleInputChange} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name="content"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Content"
                                        {...field}
                                        defaultValue={editingPost.content}
                                        className=" resize-none"
                                        onChange={handleUpdateInputChange}
                                      />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control._defaultValues.photoData}
                                name="photoData"
                                defaultValue={photoData}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                      <>
                                        <input
                                          type="file"
                                          id="imageUpload"
                                          {...field}
                                          onChange={handleEditImageUpload}
                                          className={`${photoContent ? "hidden" : "flex"}`}
                                        />

                                        <Label htmlFor="imageUpload">
                                          {imageSrc && photoContent && (
                                            <img src={imageSrc} alt="Posted Image" className="mx-auto h-64 cursor-pointer" onClick={handleImageClick} />
                                          )}
                                        </Label>
                                      </>
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant={"ghost"} className=" cursor-pointer w-full flex justify-start hover:text-red-500" onClick={showDeleteModal}>
                        Delete
                      </Button>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
          </span>
        </CardHeader>

        <CardContent className=" p-0">
          <div className=" px-3 w-full">
            <p className=" font-semibold text-lg">{title}</p>
            <p className=" mb-2">{content}</p>
          </div>
          {photoContent ? (
            <img src={`data:image/jpeg;base64,${photoContent}`} alt="Posted Image" className=" w-full max-h-auto cursor-pointer border-b border-t" />
          ) : null}
        </CardContent>
        <CardFooter className=" p-0 flex flex-col">
          {/* {hasReactions ?( <p>{reactionCounts}</p>) : null} */}
          <span className=" w-full flex justify-between">
            <p className=" px-3 py-1 text-sm text-gray-500 flex items-center gap-1">
              <AiFillHeart className="text-red-500 h-4 w-4" />
              1.3k
            </p>
          </span>

          <div className=" flex px-2 border-b py-1 border-t w-full justify-between">
            <Button variant="ghost" size="icon" className="flex w-full text-base text-gray-500 hover:text-gray-500 gap-2">
              <AiOutlineHeart className=" h-5 w-5" />
              <p>Like</p>
            </Button>
            <Button variant="ghost" size="icon" className="flex w-full text-base text-gray-500 hover:text-gray-500 gap-2">
              <FaRegCommentAlt className=" h-4 w-4" />
              <p>Comment</p>
            </Button>
          </div>
          <span className=" w-full px-3 py-3 mb-2 flex flex-row gap-2 items-center">
            <span className=" w-14">
              <Avatar className=" h-8 w-8">
                <AvatarImage src={Man_Avatar} alt="Avatar" className=" h-10 w-10 rounded-full shadow" />
                <AvatarFallback className=" shadow" delayMs={100}>
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </span>
            <Input
              type="text"
              placeholder="Comment on this post.."
              className=" w-full bg-gray-100 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className=" rounded-full" size="sm">
              Comment
            </Button>
          </span>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostCard;
