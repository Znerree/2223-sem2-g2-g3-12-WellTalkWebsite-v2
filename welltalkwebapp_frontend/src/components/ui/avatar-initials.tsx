import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  className?: string;
};

const AvatarInitials = ({ name, className }: Props) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    const colors: { [key: string]: string } = {
      "red-400": "bg-red-400",
      "blue-400": "bg-blue-400",
      "green-400": "bg-green-400",
      "yellow-400": "bg-yellow-400",
      "indigo-400": "bg-indigo-400",
      "pink-400": "bg-pink-400",
      "purple-400": "bg-purple-400",
      "gray-400": "bg-gray-400",
    };
    const colorKeys = Object.keys(colors);
    const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    setColor(colors[randomColorKey]);
  }, []);

  return <div className={cn`${color} rounded-full h-12 w-12 flex justify-center items-center shrink-0 text-white ${className}`}>{name}</div>;
};

export default AvatarInitials;
