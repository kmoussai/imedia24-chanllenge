import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import { getUsers } from "../src/api/users";
import { IUser } from "./types/user";

function UserCard(props: { user: IUser; deleteUser: any }) {
  const { user, deleteUser } = props;
  return (
    <div className="user-card">
      <img src={user.picture} alt={user.firstName} />
      <div>
        <h4>{`${user.firstName} ${user.lastName}`}</h4>
        <div
          style={{
            display: "grid",
            placeItems: "end",
            gap: "10px",
            marginRight: "-8px"
          }}
        >
          <button className="action-btn profile">Profile</button>
          <button
            className="action-btn delete"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function useUsers(page: number) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | false>(false);
  const [hasMore, setHasMore] = useState(false);

  const deleteUser = (id: string) => {
    // const index = users.findIndex(user => user.id === id)

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

export default function App(): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const { loading, users, error, hasMore, deleteUser } = useUsers(page);

  const observer = useRef<IntersectionObserver>();
  const lastUser = useCallback(
    (userElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore)
          setPage((prevPage) => page + 1);
      });
      if (userElement) observer.current.observe(userElement);
      // console.log(userElement);
    },
    [hasMore, loading]
  );

  return (
    <div className="App">
      {users.map((user, index) => {
        if (users.length - 1 === index)
          return (
            <div key={user.id} ref={lastUser}>
              <UserCard deleteUser={deleteUser} user={user} />
            </div>
          );
        return (
          <div key={user.id}>
            <UserCard deleteUser={deleteUser} user={user} />
          </div>
        );
      })}
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
