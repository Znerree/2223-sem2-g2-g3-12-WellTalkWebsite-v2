import React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
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
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

type Props = {
  postid: number;
};

const PostMenu = ({ ...props }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await axios.delete(`/posts/${props.postid}`);
      if (loading) {
        toast({
          title: "Post deleted",
          description: "Your post has been deleted successfully",
          variant: "success",
          duration: 1500,
        });
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. Are you sure you want to permanently delete this post?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button variant={"destructive"} onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
        <Toaster />
      </Dialog>
    </>
  );
};

export default PostMenu;
