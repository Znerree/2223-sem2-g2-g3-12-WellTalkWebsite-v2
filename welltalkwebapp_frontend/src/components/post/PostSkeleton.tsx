import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card className=" mx-auto mb-3 md:w-[700px] h-[450px]">
      <CardHeader>
        <div className=" flex items-center space-x-2">
          <Skeleton className="rounded-full h-10 w-10" />
          <div className=" flex flex-col space-y-1">
            <Skeleton className=" w-52 h-3" />
            <Skeleton className=" w-44 h-2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className=" space-y-2">
        <Skeleton className=" md:w-full h-4" />
        <Skeleton className=" md:w-96 h-3" />
        <Skeleton className=" md:w-80 h-3" />
      </CardContent>
    </Card>
  );
};

export default PostSkeleton;
