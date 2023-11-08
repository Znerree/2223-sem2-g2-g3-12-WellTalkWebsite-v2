import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { Input } from "./ui/input";
import Man_Avatar from "@/assets/images/man_avatar.svg";
import { RiMoreFill } from "react-icons/ri";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { GrEdit } from "react-icons/gr";
import { MdOutlineModeEdit } from "react-icons/md";
import useLoading from "@/hooks/useLoading";
import { ProgressBar } from "./Loaders";

export type PostsProps = {
  id: number;
  key: number;
  title: string;
  content: string;
  photoContent: string;
  photoData: File;
  activeBtn: string;
  showEdit?: () => void;
  showDeleteModal?: () => void;
  counselor: {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
  };
};

const PostCard = ({ id, title, content, photoContent, activeBtn, counselor, showDeleteModal, showEdit }: PostsProps) => {
  const userInitials = counselor.firstName.charAt(0) + counselor.lastName.charAt(0);

  const { loading } = useLoading();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Card className="md:w-[700px] w-full mx-auto mb-3">
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
                      <Button variant={"ghost"} className=" cursor-pointer w-full flex justify-start text-sm" onClick={() => showEdit}>
                        Edit
                      </Button>
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
