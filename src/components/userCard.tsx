import { IUser } from "../types/user";

export default function UserCard(props: {
  user: IUser;
  showUserInfo: (id: string) => void;
  deleteUser: (id: string) => void;
}) {
  const { user, deleteUser, showUserInfo } = props;

  return (
    <div className="app">
      <div className="user-card">
        <img className="img-profile" src={user.picture} alt={user.firstName} />
        <div
          style={{
            display: "grid",
            width: "100%"
          }}
        >
          <h4 className="user-name">{`${user.firstName} ${user.lastName}`}</h4>
          <div
            style={{
              display: "grid",
              placeItems: "end",
              gap: "10px",
              marginRight: "-8px",
              marginBottom: "15px"
            }}
          >
            <button
              onClick={() => showUserInfo(user.id)}
              className="action-btn profile"
            >
              Profile
            </button>
            <button
              className="action-btn delete"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
