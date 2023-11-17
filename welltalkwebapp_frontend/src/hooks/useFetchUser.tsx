import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { User } from "@/types/user";

const useFetchUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(`/users/username/${username}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return { user, setUser };
};

export default useFetchUser;
