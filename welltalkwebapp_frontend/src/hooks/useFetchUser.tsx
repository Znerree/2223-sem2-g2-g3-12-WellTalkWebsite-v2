import { useEffect, useState } from "react";
import axios from "@/api/axios";
import useLoading from "./useLoading";

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

  const { loading } = useLoading();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem("user");
        const response = await axios.get(`/users/username/${username}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchUser();
  }, [loading]);

  return { user, setUser };
};

export default useFetchUser;
