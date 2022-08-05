import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verified = () => {
      axios
        .post("http://localhost:5000/api/user/verify-user", {
          token: localStorage.getItem("jwt"),
        })
        .then((data) => {
          console.log(data);
          setUsername(data.data.username);
          console.log(username);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    verified();
  }, []);

  return <div>Welcome to home screen {username !== "" && username}</div>;
}
