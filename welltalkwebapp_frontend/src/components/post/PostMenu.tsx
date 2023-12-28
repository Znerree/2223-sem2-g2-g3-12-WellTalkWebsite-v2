import React, { useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "@/api/axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Post } from "@/types/post";
import { Textarea } from "../ui/textarea";

type PostMenuProps = {
  post: Post;
};

const PostMenu = ({ post }: PostMenuProps) => {
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [photoContent, setPhotoContent] = useState(post.photoContent);
  const [photoData, setPhotoData] = useState<File | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoData(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoContent(`data:image/png;base64,${reader.result}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const noImageForm = { title, content };

    const hasImageForm = new FormData();
    hasImageForm.append("title", title);
    hasImageForm.append("content", content);
    if (photoData) hasImageForm.append("photoData", photoData);

    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    try {
      setLoading(true);
      const postId = post.id;
      if (photoData === null) {
        await axios.put(`/posts/${postId}`, noImageForm, config);
      } else {
        await axios.put(`/posts/photo/${postId}`, hasImageForm, config);
      }

      // Update the state instead of reloading the page
      setTitle(title);
      setContent(content);
      setPhotoContent(photoContent);

      toast.success("Post updated!", {
        style: {
          color: "green",
        },
      });
      setOpenEditModal(false);
    } catch (err) {
      toast.error("An error occurred while updating the post.", {
        style: {
          color: "red",
        },
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await axios.delete(`/posts/${post.id}`);
      toast.success("Post deleted successfully.", {
        style: {
          color: "green",
        },
      });
      setOpenDeleteModal(false);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting the post.", {
        style: {
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className=" rounded-full p-1 mr-2 text-slate-500 cursor-pointer">
            <FiMoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>More options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenEditModal(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit modal */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" text-primary-600 md:text-2xl">Edit post</DialogTitle>
          </DialogHeader>
          <form className=" space-y-3" onSubmit={handleEditPost}>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />
            <Textarea
              className={`overflow-auto resize-none ${post.photoContent ? " h-24 " : " h-32"}`}
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
            <div className="w-full border cursor-pointer">
              {photoContent && (
                <img
                  src={photoData ? URL.createObjectURL(photoData) : `data:image/png;base64,${photoContent}`}
                  alt="Posted image"
                  className="mx-auto max-h-60"
                  loading="lazy"
                  onClick={handleImageClick}
                />
              )}
              <Input
                type="file"
                accept="image/*"
                className={`${photoContent ? "hidden" : "flex"}`}
                onChange={handleFileInputChange}
                ref={fileInputRef}
                disabled={loading}
              />
            </div>

            <Button className=" w-full" type="submit" disabled={loading}>
              Save changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete modal */}
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" text-primary-600 md:text-2xl">Delete post</DialogTitle>
          </DialogHeader>
          <DialogDescription>Are you sure you want to delete this post?</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"} disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={"destructive"} onClick={handleDeletePost} disabled={loading}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostMenu;
