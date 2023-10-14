import { useEffect, useState } from "react";
import axios from "@/api/axios";

type userProps = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userType: string;
};

const useFetchUser = () => {
  const [user, setUser] = useState<userProps>();

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

  return { user };
};

export default useFetchUser;
