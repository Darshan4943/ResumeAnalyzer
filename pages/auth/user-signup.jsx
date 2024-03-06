import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reCallUserData } from "../../Redux/actions/user";
import Link from "next/link";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function UserSignUp({ setIsSignIn, setSignIn, setSignUp }) {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [googleLoading, setGoogleLoading] = useState(false);
  const auth = getAuth();
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
      };
      const sendToPurchase = localStorage.getItem("purchase");
      const sendToPurchaseResult = JSON.parse(sendToPurchase);
      axios
        .post(
          "https://freedygoservices.in/api/skiloteckuser/user/google/signup",
          userData
        )
        .then((res) => {
          localStorage.setItem("authToken", JSON.stringify(res.data));
          if (sendToPurchaseResult?.status) {
            localStorage.removeItem("purchase");
            window.location.href = `/purchase/details?id=${
              sendToPurchaseResult.index + 1
            }`;
          } else {
            setGoogleLoading(false);
            window.location.href = "/home";
          }
        })
        .catch((err) => {
          setGoogleLoading(false);
          console.log(err);
        });
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Sign-in with Google popup was cancelled by the user.");
      } else {
        console.error("Error signing in with Google:", error.message);
      }
      setGoogleLoading(false);
    }
  };


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const clearError = () => {
    setError(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const sendToPurchase = JSON.parse(localStorage.getItem("purchase"));

    const dataToSend = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    setLoading(true);
    axios
      .post(
        "https://freedygoservices.in/api/skiloteckuser/user/signup",
        dataToSend
      )
      .then((res) => {
        const response = res.data;
        try {
          if (response?.success) {
            localStorage.setItem("authToken", JSON.stringify(response));
            dispatch(reCallUserData());
            toast.success("Sign up Successfully");
            if (sendToPurchase && sendToPurchase?.status) {
              setLoading(false);
              window.location.href = `/purchase/details?id=${
                sendToPurchase.index + 1
              }`;
            } else {
              setLoading(false);

              window.location.href = `/home`;
            }
          } else {
            setLoading(false);

            if (response.message === "user already exist") {
              setError("User already exists");
            } else {
              toast.error("Something went wrong");
            }
          }
        } catch (err) {
          setLoading(false);

          console.log(err);
        }
      })
      .catch((err) => {
        setError(err?.response?.data.message);
        console.log(err.response);
      });
  };

  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase();
    setData({ ...data, email: lowercaseEmail });
    setIsEmailEntered(lowercaseEmail.trim() !== "");
    clearError();
  };

  const handlePasswordChange = (e) => {
    setData({ ...data, password: e.target.value });
    clearError();
  };

  const handleConfirmPasswordChange = (e) => {
    setData({ ...data, confirmPassword: e.target.value });
    clearError();
  };

  return (
    <div className="flex justify-center items-center py-12 pl-[8px] pr-[8px]">
      <form
        onSubmit={submitHandler}
        className=" bg-white flex w-[95%] sm:w-[464px] p-[24px] gap-[24px] flex-col justify-center items-center rounded-[24px] "
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="text-[30px] font-[600]">Sign Up</div>
        <div className="w-full flex flex-col gap-[24px]">
          <div className="flex flex-row px-[16px] py-[12px] border-[1px]  rounded-[8px] border-solid border-[#9D9D9D]">
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email"
              value={data.email}
              onChange={handleEmailChange}
              className="w-full "
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] border-solid border-[#9D9D9D] justify-between">
              <input
                type={showPassword ? "text" : "password"}
                name=""
                id=""
                placeholder="Enter password"
                className="w-full"
                value={data.password}
                required
                onChange={handlePasswordChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={handleTogglePassword}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                  fill="#9D9D9D"
                />
              </svg>
            </div>
            <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] border-solid border-[#9D9D9D] justify-between">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name=""
                id=""
                placeholder="Confirm password"
                className="w-full"
                value={data.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={handleToggleConfirmPassword}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                  fill="#9D9D9D"
                />
              </svg>
            </div>

            <div
              className={`flex justify-start text-[16px] gap-2  ${
                error ? "text-red font-[600]" : "text-green font-[600]"
              }`}
            >
              {error && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_625_15556)">
                    <path
                      d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16C13 15.7167 12.9042 15.4792 12.7125 15.2875C12.5208 15.0958 12.2833 15 12 15C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM11 13H13V7H11V13ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                      fill="#C00000"
                    />
                  </g>
                </svg>
              )}
              <p>{error}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[16px]">
          <button
            disabled={!isEmailEntered}
            className="w-full px-[36px] py-[12px] rounded-[12px] border-[1px] border-solid border-[#06a9ef]  text-[20px] font-[500] hover:bg-[#06a9ef] hover:text-[#fff] transition-all duration-200"
            style={{ borderColor: "#06a9ef" }}
          >
            Sign Up
          </button>
          <div className="flex flex-row items-center justify-center gap-[6px]">
            <div className="w-[50%] h-[1px] bg-[#9D9D9D]"></div>Or
            <div className="w-[50%] h-[1px] bg-[#9D9D9D]"></div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div
              onClick={handleGoogle}
              style={{ borderColor: "#9D9D9D" }}
              className=" cursor-pointer w-full px-[36px] py-[12px] rounded-[12px] border-[1px] border-solid border-[#9D9D9D]   text-[16px] font-[500] text-[#333] flex items-center gap-2 justify-center continue_btn"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_128_5190)">
                  <path
                    d="M24.4873 12.2245C24.4873 11.2413 24.4057 10.5237 24.229 9.77963H12.739V14.2176H19.4833C19.3474 15.3205 18.6132 16.9815 16.9814 18.0976L16.9585 18.2461L20.5915 20.9963L20.8431 21.0209C23.1547 18.9347 24.4873 15.8653 24.4873 12.2245Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.7391 23.9176C16.0433 23.9176 18.8171 22.8545 20.8432 21.0209L16.9815 18.0976C15.9481 18.8018 14.5611 19.2934 12.7391 19.2934C9.50291 19.2934 6.75622 17.2074 5.77711 14.324L5.63359 14.3359L1.85604 17.1927L1.80664 17.3269C3.81906 21.2334 7.95273 23.9176 12.7391 23.9176Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.77702 14.324C5.51867 13.5799 5.36916 12.7826 5.36916 11.9588C5.36916 11.1349 5.51867 10.3377 5.76343 9.5936L5.75658 9.43513L1.9317 6.53241L1.80655 6.59058C0.97714 8.21168 0.501221 10.0321 0.501221 11.9588C0.501221 13.8855 0.97714 15.7058 1.80655 17.3269L5.77702 14.324Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.7391 4.62403C15.0371 4.62403 16.5871 5.59402 17.471 6.40461L20.9248 3.10928C18.8036 1.1826 16.0433 0 12.7391 0C7.95273 0 3.81906 2.68406 1.80664 6.59056L5.76351 9.59359C6.75622 6.7102 9.50291 4.62403 12.7391 4.62403Z"
                    fill="#EB4335"
                  />
                </g>
              </svg>
              Sign Up with Google
            </div>

            <div className="text-[14px] flex justify-center font-medium items-center cursor-pointer">
              Already have an account ?{" "}
              <span
                onClick={() => {
                  router.push("/auth?signin=true");
                }}
                className="already_sign"
                style={{
                  fontSize: "12px",
                  color: "#06A9EF",
                }}
              >
                <a> Sign In</a>
              </span>
            </div>
            <div className="text-[12px] ">
              By signing in, you agree to our{" "}
              <span
                className="already_sign cursor-pointer"
                style={{
                  fontSize: "12px",
                  color: "#06A9EF",
                }}
              >
                <a href="">Terms & Conditions</a>
              </span>{" "}
              and{" "}
              <span
                className="already_sign cursor-pointer"
                style={{
                  fontSize: "12px",
                  color: "#06A9EF",
                }}
              >
                {" "}
                <a href="">Privacy Policy.</a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserSignUp;
