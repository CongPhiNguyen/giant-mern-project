import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./signup.scss";

export default function SignUp(props) {
  const [isUsernameExist, setIsUsernameExist] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [signUpState, setSignUpState] = useState("signup");
  const [countDownTime, setCountDownTime] = useState(0);
  const [captchaVerify, setCaptchaVerify] = useState(false);

  const checkUsernameExist = (username) => {
    axios
      .post("http://localhost:5000/api/user/exist-username", {
        username: username,
      })
      .then((data) => {
        // console.log(data.data.find);
        if (data.data.find === true) {
          setIsUsernameExist(true);
        } else {
          setIsUsernameExist(false);
        }
      })
      .catch((error) => {
        // console.log(error.response.status === 404);
        toast(error.message);
        // if (error.response.status === 404) {
        //   setIsUsernameExist(false);
        // }
      });
  };

  const checkValidEmailFormat = (email) => {
    let checkRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (checkRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const checkEmailExist = (email) => {
    axios
      .post("http://localhost:5000/api/user/exist-email", {
        email: email,
      })
      .then((data) => {
        // console.log(data.data.find);
        if (data.data.find === true) {
          setIsEmailExist(true);
        } else {
          setIsEmailExist(false);
        }
      })
      .catch((error) => {
        // console.log(error.response.status === 404);
        toast(error.message);
        // if (error.response.status === 404) {
        //   setIsUsernameExist(false);
        // }
      });
  };

  const signupUser = (username, email, password) => {
    if (username.length == 0 || password.length == 0) {
      toast("You must input all the information");
      return;
    }
    axios
      .post("http://localhost:5000/api/user/sign-up", {
        email: email,
        username: username,
        password: password,
      })
      .then((data) => {
        console.log("data", data);
        sendOTP(username, email);
        setCurrentUsername(username);
        pageRef.username.current.value = "";
        setCurrentStep(2);
        // toast("Signup successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast("Signup failed!");
      });
  };

  const sendOTP = (username, email) => {
    axios
      .post("http://localhost:5000/api/otp/make-otp-sign-up", {
        username: username,
        email: email,
      })
      .then((data) => {
        if (data.data.success == true) {
          let timeCountDown = Math.round(
            60 - (new Date() - new Date(data.data.time).getTime()) / 1000
          );
          setCountDownTime(timeCountDown);
          let timeID = setInterval(() => {
            console.log(countDownTime);
            setCountDownTime((prevVal) => {
              if (prevVal == 0) clearInterval(timeID);
              return prevVal - 1;
            });
          }, 1000);
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const pageRef = {
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    otpRef: useRef(null),
  };

  const emailCheckComp = () => {
    if (isEmailExist) {
      return <p className="error-input">Email is exist</p>;
    } else if (!isValidEmail) {
      return <p className="error-input">Email is not valid</p>;
    } else return null;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [currentUsername, setCurrentUsername] = useState("");
  const submitOTP = (username, otp) => {
    // console.log(otp);
    axios
      .post("http://localhost:5000/api/otp/check-otp", {
        username: username,
        otp: otp,
        time: new Date(),
      })
      .then((data) => {
        console.log(data.data);
        if (data.data.success == true) {
          toast("Authentication OK");
          props.changeComponent("home");
        } else {
          toast(data.data.message);
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <div className="app-container">
      <div className="signup-container">
        <h1 className="signup-title">SIGN UP</h1>
        <div className="input-container">
          <label htmlFor="username" className="input-title">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="input-box"
            ref={pageRef.username}
            onBlur={() => {
              checkUsernameExist(pageRef.username.current.value);
            }}
          />
        </div>
        {isUsernameExist ? (
          <p className="error-input">Username is exist</p>
        ) : null}
        <div className="input-container">
          <label htmlFor="username" className="input-title">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input-box"
            ref={pageRef.email}
            onBlur={() => {
              checkEmailExist(pageRef.email.current.value);
              checkValidEmailFormat(pageRef.email.current.value);
            }}
          />
        </div>
        {emailCheckComp()}
        <div className="input-container">
          <label htmlFor="password" className="input-title">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-box"
            ref={pageRef.password}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-title">
            Confirm password
          </label>
          <input
            type="password"
            id="password"
            className="input-box"
            ref={pageRef.password}
          />
        </div>
        <div className="input-container">
          <label htmlFor="otp" className="input-title">
            OTP
          </label>
          <div className="input-concrete">
            <input
              type="text"
              id="otp"
              className="input-box"
              ref={pageRef.otpRef}
              defaultValue=""
            />
            <button
              className={
                isUsernameExist && countDownTime <= 0 && captchaVerify
                  ? "send-otp-button"
                  : "send-otp-button disable"
              }
              onClick={() => {
                if (isUsernameExist && countDownTime <= 0 && captchaVerify)
                  sendOTP(pageRef.usernameRef.current.value);
              }}
            >
              Send
            </button>
          </div>
        </div>
        {countDownTime > 0 ? (
          <p className="count-down">OTP valid in {countDownTime} seconds</p>
        ) : null}
        <button
          className="send-otp-button"
          onClick={() =>
            submitOTP(currentUsername, pageRef.otpRef.current.value)
          }
        >
          Submit
        </button>
        <button
          className="login-button"
          onClick={() => {
            signupUser(
              pageRef.username.current.value,
              pageRef.email.current.value,
              pageRef.password.current.value
            );
          }}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
