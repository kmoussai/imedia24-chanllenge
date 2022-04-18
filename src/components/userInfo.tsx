import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getUserById } from "../api/users";
import { IUser } from "../types/user";

export default function UserInfo(props: { id: string }) {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    getUserById(props.id)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  if (loading) return <p>loading</p>;
  if (error) return <p>fetch error</p>;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "50%",
          display: "grid",
          placeItems: "center"
        }}
      >
        <img
          style={
            {
              // width: '50%'
            }
          }
          src={user.picture}
          alt={user.firstName}
        />
      </div>
      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(2, 1fr)"
        }}
      >
        <div>
          <p className="title">
            {user.title}. {user.firstName} {user.lastName}
          </p>
          <p>
            <span className="title">Gender :</span> {user.gender}
          </p>
          <p>
            <span className="title">Date of birth:</span>{" "}
            {format(new Date(user.dateOfBirth), "MMM dd yyyy")}
          </p>
          <p>
            <span className="title">Register date: </span>
            {format(new Date(user.registerDate), "MMM dd yyyy")}
          </p>
          <p>
            <span className="title">Email: </span> {user.email}
          </p>
          <p>
            <span className="title">Phone: </span>
            {user.phone}
          </p>
        </div>
        <div>
          <p className="title">Adress</p>
          <p>
            <span className="title">State :</span> {user.location.state}
          </p>
          <p>
            <span className="title">Street :</span> {user.location.street}
          </p>
          <p>
            <span className="title">City :</span> {user.location.city}
          </p>
          <p>
            <span className="title">Country :</span> {user.location.country}
          </p>
          <p>
            <span className="title">Timezone :</span> {user.location.timezone}
          </p>
        </div>
      </div>
    </div>
  );
}
