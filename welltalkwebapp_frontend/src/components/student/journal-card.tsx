import { StudentJournalType } from "@/types/student-journal";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CgProfile } from "react-icons/cg";
import { Student } from "@/types/student";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type JournalCardProps = {
  userid: number;
  date: string;
  mood: string;
  title: string;
  message: string;
  author: Student;
  authorFname: string;
  authorLname: string;
};

const JournalCard = ({ date, mood, title, message, userid, authorFname, authorLname }: JournalCardProps) => {
  const dateParts = date.split("-").map((part) => parseInt(part, 10));
  const dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const formattedDate = `${monthNames[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

  return (
    <>
      <Card className=" max-h-48 mb-3 mr-4 py-2">
        <CardContent className=" p-0">
          <CardHeader className=" px-4 py-2 text-sm">
            <div className=" flex items-center gap-2">
              <Avatar className=" border items-center justify-center bg-slate-100">
                <AvatarImage className=" w-8 h-8" src={"https://api.dicebear.com/7.x/pixel-art/svg"} />
              </Avatar>
              <span>
                <h1 className=" font-semibold mr-5 text-primary-500">
                  {authorFname} {authorLname}
                </h1>
                <p className=" text-xs font-thin text-gray-400">{formattedDate}</p>
              </span>
              <Badge className=" text-xs h-5 ml-12">{mood}</Badge>
            </div>
          </CardHeader>
          <CardTitle className=" px-4 text-sm font-semibold">{title}</CardTitle>
          <CardDescription className=" px-4 py-1 text-sm">{message}</CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default JournalCard;
