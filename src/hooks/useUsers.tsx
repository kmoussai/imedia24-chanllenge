import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import { IUser } from "../types/user";

export default function useUsers(page: number) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | false>(false);
  const [hasMore, setHasMore] = useState(false);

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id != id));
  };
  useEffect(() => {
    setloading(true);
    setError(false);

    getUsers({ page })
      .then((data) => {
        setUsers([...users, ...data]);
        setloading(false);
        setHasMore(data.length > 0);
      })
      .catch((err) => setError(err.toString()));
  }, [page]);

  return { loading, error, users, hasMore, deleteUser };
}
