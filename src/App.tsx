import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import useUsers from "./hooks/useUsers";
import UserCard from "./components/userCard";
import Modal from "@mui/material/Modal";
import UserInfo from "./components/userInfo";

export default function App(): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [ModalUserId, setModalUserId] = useState("");
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

  const showUserInfo = (id: string) => {
    setOpen(!open);
    setModalUserId(open ? "" : id);
  };

  return (
    <div className="App">
      <Modal onClose={() => setOpen(!open)} open={open}>
        <div
          style={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: "24px",
            padding: "4px"
          }}
        >
          <UserInfo id={ModalUserId} />
        </div>
      </Modal>
      {users.map((user, index) => {
        if (users.length - 1 === index)
          return (
            <div key={user.id} ref={lastUser}>
              <UserCard
                showUserInfo={showUserInfo}
                deleteUser={deleteUser}
                user={user}
              />
            </div>
          );
        return (
          <div key={user.id}>
            <UserCard
              showUserInfo={showUserInfo}
              deleteUser={deleteUser}
              user={user}
            />
          </div>
        );
      })}
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
