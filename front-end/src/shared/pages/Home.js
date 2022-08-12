import React, { useEffect, useState } from "react";
import axios from "axios";
import { cookiesUtil } from "../../utilities/cookies";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../sharedSlice";
import { parseJwt } from "../../utilities/jwt";

export default function Home() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  // useEffect(() => {
  //   console.log("parseJWT", parseJwt(cookiesUtil.getAccessToken()));
  // });

  // useEffect(() => {
  //   const verified = () => {
  //     axios
  //       .post("http://localhost:5000/api/user/verify-user", {
  //         token: cookiesUtil.getAccessToken(),
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setUsername(data.data.username);
  //         dispatch(setCurrentUser(data.data.username));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         navigate("/sign-in");
  //       });
  //   };
  //   verified();
  // }, []);

  // useSelector((state) => {
  //   console.log("state", state);
  // });

  return <div>Welcome to home screen {username !== "" && username}</div>;
}
