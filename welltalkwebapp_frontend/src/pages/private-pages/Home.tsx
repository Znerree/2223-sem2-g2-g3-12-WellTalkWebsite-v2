import axios from "@/api/axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideImagePlus } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import { Post } from "@/types/post";
import { IoClose } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import PostSkeleton from "@/components/post/PostSkeleton";
import PostMenu from "@/components/post/PostMenu";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import AvatarInitials from "@/components/ui/avatar-initials";
import Linkify from "@/components/Linkify";
import CreatePost from "@/components/post/CreatePost";
import PostCard from "@/components/post/PostCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  const [allPosts, setAllposts] = useState<Post[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [activeButton, setActiveButton] = useState("all");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const user = useAuth();

  const getAllPosts = async () => {
    try {
      const config = {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      };
      const response = await axios.get("/posts", config);
      const sortedPosts = response.data.sort((a: any, b: any) => b.id - a.id);
      setAllposts(sortedPosts);
    } catch (err) {
      console.error(err);
    }
  };

  const getMyPosts = async () => {
    try {
      const config = {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      };
      const response = await axios.get("/myPosts", config);
      const sortedPosts = response.data.sort((a: any, b: any) => b.id - a.id);
      setMyPosts(sortedPosts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        await Promise.all([getAllPosts(), getMyPosts()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const authorInitials = (post: Post) => {
    const initials = post.counselor.firstName.charAt(0) + post.counselor.lastName.charAt(0);
    return initials;
  };

  const userInitials = user ? user.user && user.user.firstName.charAt(0) + user.user.lastName.charAt(0) : null;

  return (
    <div className=" container mx-auto">
      {/* Create post modal */}
      <CreatePost />
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

      {!loading ? (
        <>
          {activeButton === "all" && (
            <>
              {allPosts.map((post) => (
                <PostCard key={post.id} post={post} activeButton="all" />
              ))}
            </>
          )}

          {activeButton === "my" && (
            <>
              {myPosts.map((post) => (
                <PostCard key={post.id} post={post} activeButton="my" />
              ))}
            </>
          )}
        </>
      ) : (
        <PostSkeleton />
      )}
    </div>
  );
};

export default Home;
