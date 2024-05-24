import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MiniLoader from "../common/mini-loader";

function ForgotPassword({ setIsForgot }) {
  const [tabIndex, setTabIndex] = useState(1);
  const [verify, setVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState(null);
  const [otpEntered, setOtpEntered] = useState(null);
  const [timer, setTimer] = useState(30);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);

  const handleVerification = (e) => {
    setResend(false);
    setTimer(30);
    setLoading(true);
    e.preventDefault();
    let otp = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp);
    axios
      .post("https://jamblix.com/api/otpMail", {
        userEmail: email,
        otp,
      })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        if (result.success) {
          setVerify(true);
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data.message);
        setLoading(false);
      });
  };

  const verifyOtp = () => {
    if (otp == otpEntered) {
      setTabIndex(2);
    } else {
      toast.error("OTP does not match");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      const response = await axios.post(
        "https://jamblix.com/api/updatePassword",
        {
          email: email,
          newPassword: password,
        }
      );

      toast.success(response.data.message);

      setPassword("");

      setTabIndex(3);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (verify) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval);
            setResend(true);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [verify, resend]);

  useEffect(() => {
    if (!verify) {
      setTimer(30);
      setResend(false);
    }
  }, [verify]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <>
      {tabIndex === 1 && (
        <div className=" absolute rounded-[16px] bg-white shadow-lg p-6 flex flex-col gap-6 ml:min-w-[400px] ml:w-[33%] ms:w-[60%] scr420:w-[80%] w-[90%]">
          <div className="flex justify-center scr420:text-[30px] text-[24px] font-[600] ">
            Forgot Password
          </div>

          <div className=" flex flex-col gap-2">
            <p className=" text-[14px] font-[500]">Username</p>
            <input
              type="text"
              name=""
              id="email"
              placeholder="Enter Email"
              className="border border-[#DEDEDE] rounded-[8px] px-4 py-3 w-[100%]"
              onChange={(e) => setEmail(e.target.value)}
              disabled={verify}
            />
          </div>
          {verify && (
            <div className=" flex flex-col gap-2">
              <p className=" text-[14px] font-[500]">Verification Code</p>
              <input
                type="text"
                name=""
                id="email"
                placeholder="Enter Otp"
                className="border border-[#DEDEDE] rounded-[8px] px-4 py-3 w-[100%]"
                onChange={(e) => setOtpEntered(parseInt(e.target.value))}
              />

              <div className="text-[12px] font-[600] text-[#C00000]">
                Please enter the Verification code sent to your email.
              </div>
              <div className="text-[12px] flex gap-2 font-[600] ">
                <p className="text-[#404040]">Didn’t you receive any code?</p>

                <button
                  onClick={handleVerification}
                  disabled={!resend}
                  className={` ${
                    resend
                      ? "text-blue border-blue"
                      : "text-[#BEBEBE] border-[#BEBEBE]"
                  } border-b  leading-tight `}
                >
                  Re-send Code
                </button>
                {!resend && (
                  <p className="text-[#C00000]">{formatTime(timer)}</p>
                )}
              </div>
            </div>
          )}

          {verify ? (
            <button
              onClick={verifyOtp}
              className="border border-[#06A9EF] text-white text-[20px] font-[500] bg-[#06A9EF] rounded-[12px] px-4 py-3 w-[100%]"
            >
              Verify & Proceed
            </button>
          ) : (
            <button
              onClick={handleVerification}
              className="h-[55.33px] border border-[#06A9EF] items-center text-white text-[20px] flex justify-center font-[500] bg-[#06A9EF] rounded-[12px] px-4 py-3 w-[100%]"
            >
              {loading ? <MiniLoader /> : "Verify Email  "}
            </button>
          )}
        </div>
      )}
      {tabIndex === 2 && (
        <div className=" absolute rounded-[16px] bg-white shadow-lg p-6 flex flex-col gap-6 ml:min-w-[400px] ml:w-[33%] ms:w-[60%] scr420:w-[80%] w-[90%]">
          <div className="flex justify-center text-[30px] font-[600] ">
            Reset Password
          </div>

          {errorMessage && <div className="text-red">{errorMessage}</div>}
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-[500]">Create New Password</p>
            <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] items-center border-solid border-[#9D9D9D] justify-between">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Enter Password"
              />

              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                    fill="#9D9D9D"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_955_15194)">
                    <path
                      d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                      fill="#9D9D9D"
                    />
                  </g>
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-[500]">Confirm Password</p>
            <div className="flex flex-row px-[16px] py-[12px] border-[1px]  items-center rounded-[8px] border-solid border-[#9D9D9D] justify-between">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Enter Password"
              />

              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                    fill="#9D9D9D"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_955_15194)">
                    <path
                      d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                      fill="#9D9D9D"
                    />
                  </g>
                </svg>
              )}
            </div>
          </div>

          <button
            onClick={(e) => handleSubmit(e)}
            className="border border-[#06A9EF] text-white text-[20px] font-[500] bg-[#06A9EF] rounded-[12px] px-4 py-3 w-[100%]"
          >
            Submit
          </button>
        </div>
      )}

      {tabIndex === 3 && (
        <>
          <div className=" absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%] ">
            <svg
              className="absolute top-[-40px]  left-[38%] right-[62%] flex"
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="85"
              viewBox="0 0 85 85"
              fill="none"
            >
              <g clip-path="url(#clip0_6622_116765)">
                <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                <g mask="url(#mask0_6622_116765)">
                  <path
                    d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_6622_116765">
                  <rect width="85" height="85" rx="42.5" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div className="text-center">
              <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
                Password Changed Successfully
              </div>
              {/* <div className="text-[16px] font-[500] text-[#333]">
                                Check your email for confirmation
                            </div> */}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setIsForgot(false)}
                className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
