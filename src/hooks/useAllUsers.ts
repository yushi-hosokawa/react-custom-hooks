import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import axios from "axios";
import { User } from "../types/api/user";

//全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfile, setUserProfile] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setError(false);
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        const Data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfile(Data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfile, loading, error };
};
