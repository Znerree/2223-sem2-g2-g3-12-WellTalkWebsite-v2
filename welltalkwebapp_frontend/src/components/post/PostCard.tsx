import { Post } from "@/types/post";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import AvatarInitials from "../ui/avatar-initials";
import Linkify from "../Linkify";
import { Button } from "../ui/button";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { Input } from "../ui/input";
import PostMenu from "./PostMenu";

type PostCardProps = {
  post: Post;
  activeButton: string;
};

const PostCard = ({ post, activeButton }: PostCardProps) => {
  const authorInitials = (post: Post) => {
    return post.counselor ? post.counselor.firstName.charAt(0) + post.counselor.lastName.charAt(0) : "";
  };

  return (
    <div>
      <Card key={post.id} className=" mx-auto mb-3 md:w-[700px]">
        <CardHeader className=" p-1 w-full">
          <div className=" flex p-3 gap-2 items-center">
            <AvatarInitials name={authorInitials(post).toUpperCase()} />
            <span className=" flex-1">
              <CardTitle className=" text-lg">{post.counselor ? `${post.counselor.firstName} ${post.counselor.lastName}` : ""}</CardTitle>

              <CardDescription className=" text-xs border-b-transparent border-b hover:border-b-inherit w-min">{post.counselor.userType}</CardDescription>
            </span>
            {activeButton === "my" ? <PostMenu post={post} /> : null}
          </div>
        </CardHeader>

        <CardContent className=" space-y-2 px-0">
          <CardTitle className=" text-lg font-semibold px-5">{post.title}</CardTitle>
          <CardDescription className="text-sm px-5">
            <Linkify>{post.content}</Linkify>
          </CardDescription>
          {post.photoContent && (
            <img src={`data:image/png;base64,${post.photoContent}`} alt="posted image" className=" w-full border-t border-b max" loading="lazy" />
          )}
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
    </div>
  );
};

export default PostCard;
