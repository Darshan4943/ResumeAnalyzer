import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import ForgotPassword from "../../components/models/forgotPassword";
import { auth } from "../../utils/firebase";
import { fetchUserData } from "../../Redux/slices/userSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


function Sign_in({  setSignIn, setSignUp }) {
    const { role } = useRouter().query;
    const dispatch = useDispatch();
    const sendToPurchase = JSON.parse(localStorage.getItem("purchase"));
    const [loading, setLoading] = useState(false);
    const [isEmailEntered, setIsEmailEntered] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const auth = getAuth();
    const taskRef = useRef(null);
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setGoogleLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userData = {
                name: user.displayName,
                email: user.email,
                userRole: role
            };
            const sendToPurchase = localStorage.getItem("purchase");
            const sendToPurchaseResult = JSON.parse(sendToPurchase);
            axios
                .post(
                    "https://dev.api.skilotech.com/api/skiloteckuser/user/google/signup",
                    {userData}
                )
                .then((res) => {
                    localStorage.setItem("authToken", JSON.stringify(res.data));
                    if (sendToPurchaseResult?.status) {
                        localStorage.removeItem("purchase");
                        window.location.href = `/purchase/details?id=${sendToPurchaseResult.index + 1
                            }`;
                    } else {
                        setGoogleLoading(false);
                        window.location.href = "/?signIn=true";
                    }
                })
                .catch((err) => {
                    setGoogleLoading(false);
                    console.log(err);
                    toast.error(err.response.data.message);
                });
        } catch (error) {
            if (error.code === "auth/cancelled-popup-request") {
                console.log("Sign-in with Google popup was cancelled by the user.");
            } else {
                console.log("Error signing in with Google:", error.message);
            }
            setGoogleLoading(false);
        }
    };
    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {
            setIsForgot(false);
            localStorage.setItem("purchase", false);
        }
    };
    const openInNewTab = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("authToken"));
        if (token) {
            router.push("/home");
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            localStorage.setItem("purchase", false);
        };
    }, []);
    const router = useRouter();
    const [data, setData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isForgot, setIsForgot] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const clearError = () => {
        setError(null);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = {
            email: data.email.toLowerCase(),
            password: data.password,
            role: role,
        };
        axios
            .post("https://dev.api.skilotech.com/api/skiloteckuser/signin", dataToSend)
            .then((res) => {
                try {
                    const response = res.data;
                    localStorage.setItem("authToken", JSON.stringify(response));
                    dispatch(fetchUserData());
                    toast.success("Sign in Successfully");
                    if (sendToPurchase?.status) {
                        localStorage.removeItem("purchase");
                        setTimeout(() => {
                            setLoading(false);
                            window.location.href = `/purchase/details?id=${sendToPurchase.index + 1
                                }`;
                        }, 1000);
                        
                    } else {
                        setTimeout(() => {
                            setLoading(false);
                            window.location.href = role === "user" ? "/home?signIn=true" :"/?signIn=true";

                        }, 1000);
                    }
                } catch (err) {
                    console.log(err);
                }
            })
            .catch((err) => {
                setError(err?.response?.data.message);
                console.log(err.response);
                setLoading(false);
            });
    };
    const handleEmailChange = (e) => {
        const lowercaseEmail = e.target.value.toLowerCase();
        setData({ ...data, email: e.target.value });
        clearError();
    };

    const handlePasswordChange = (e) => {
        setData({ ...data, password: e.target.value });
        clearError();
    };

    const isEdge = () => {
        return /Edg/.test(navigator.userAgent);
    };



    return (
        <div className=" flex justify-center items-center py-[72px] px-2 gap-[50px] min-h-[calc(100vh-351.66px)]">
            <div className="scr1024:block hidden h-[480px] w-[480px] ">
                <img
                    src="/images/auth/signIn.png"
                    alt=""
                    className="h-[480px] w-[480px]  object-cover"

                />
            </div>
            <form
                onSubmit={submitHandler}
                className="  bg-white flex w-[400px]  sm:p-[24px] p-3 gap-[24px] flex-col justify-center items-center rounded-[24px] "
                style={{
                    boxShadow: "0px 0px 14px 0px #00000005",
                }}
            >
                <div className="text-[20px] font-[600]"> {role === "user" ? "Candidate Sign In " : role === "recruiter" ? "Recruiter Sign In" : "Employer Sign In"}</div>
                <div className="w-full flex flex-col gap-[24px]">
                    <div className="flex flex-row px-[16px] py-[10px] border-[1px]  rounded-[8px] border-solid border-[#DEDEDE]">
                        <input
                            type="email"
                            name=""
                            id=""
                            placeholder="Enter Email"
                            value={data.email}
                            onChange={handleEmailChange}
                            className="w-full text-[12px] font-normal leading-[18.67px] "
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] relative ">
                        <div className="flex flex-row px-[16px] py-[10px] border-[1px] rounded-[8px] items-center border-solid border-[#DEDEDE] justify-between">
                            <input
                                type={showPassword ? "text" : "Password"}
                                name=""
                                id=""
                                placeholder="Enter Password"
                                className="w-[90%] text-[12px] font-normal leading-[18.67px]"
                                required
                                value={data.password}
                                onChange={handlePasswordChange}
                            />
                            {!isEdge() && (
                                showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        onClick={handleTogglePassword}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <path
                                            d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                                            fill="#333333"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        onClick={handleTogglePassword}
                                        style={{ cursor: "pointer" }}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g mask="url(#mask0_955_15194)">
                                            <path
                                                d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                                                fill="#333333"
                                            />
                                        </g>
                                    </svg>
                                ))}
                        </div>
                        <div className="flex justify-between text-[#06A9EF] text-[12px] font-[500] cursor-pointer ">
                            {error && (
                                <div
                                    className={`flex justify-start scr420:text-[16px] scr360:text-[13px] text-[11px] gap-2  items-center bottom-[-30px] w-full  ${error
                                        ? "text-[#c00000] font-[600]"
                                        : "text-green font-[600]"
                                        }`}
                                >
                                    <div className="w-[18px] h-[18px] scr420:w-[24px] scr420:h-[24px]">
                                        <svg
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
                                    </div>
                                    <p>{error}</p>
                                </div>
                            )}
                            <a
                                className="flex justify-end w-full"
                                onClick={() => setIsForgot(true)}
                            >
                                Forgot Password?
                            </a>
                        </div>
                        {isForgot && (
                            <>
                                <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                                <div
                                    ref={taskRef}
                                    className="fixed z-[2000] top-[40%] left-0 right-0  flex items-center justify-center  "
                                >
                                    <ForgotPassword setIsForgot={setIsForgot} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[16px]">
                    <button
                        disabled={loading}
                        style={{ borderColor: "#06a9ef" }}
                        className={`w-full px-[36px] py-[10px] rounded-[30px] border-[1px] border-solid leading-[20.67px] border-[#06a9ef] text-[14px] font-[600] text-[#fff]  bg-[#06a9ef] ${loading && "bg-[#06a9ef]"
                            } hover:text-[#333333] transition-all duration-200 hover:bg-[#fff]`}
                    >
                        {loading ? (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#bebebe"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#fff"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                    {/* {role === "user" && ( */}
                    <div className="flex flex-row items-center justify-center gap-[6px] text-[16px] font-medium">
                        <div className="w-[50%] h-[1px] bg-[#DEDEDE]"></div>Or
                        <div className="w-[50%] h-[1px] bg-[#DEDEDE]"></div>
                    </div>
                    {/* )} */}
                    <div className="flex flex-col gap-[16px]">
                        {/* {role === "user" && ( */}
                        <div

                            onClick={handleGoogle}
                            disabled={googleLoading}
                            className=" cursor-pointer w-full sm:px-[36px] px-4 py-[10px] rounded-[30px] border-[1px] leading-[20.67px]  border-[#06A9EF]   text-[16px] font-[600] text-[#333] flex items-center gap-2 justify-center "
                        >
                            {googleLoading ? (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#bebebe"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="#06a9ef"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <svg
                                        width="18"
                                        height="18"
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
                                    Continue with Google
                                </>
                            )}
                        </div>
                        {/* )} */}
                        <div
                            onClick={() => {
                                role === "user" ?
                                    router.push("/auth/Sign_up?role=user") :  role === "recruiter" ?
                                    router.push("/auth/Sign_up?role=recruiter") : router.push("/auth/EmployerSignUp");
                            }}
                            className="flex justify-center items-center text-[10px] font-[600] text-[#646464] cursor-pointer"
                        >
                            Do not have an account?
                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#06A9EF",
                                }}
                                className="pl-1"
                            >

                                Sign up
                            </span>
                        </div>
                        <div className="text-[10px] text-center ">
                            By signing in, you agree to our{" "}
                            <span
                                // onClick={() => router.push("/TermsAndConditions")}
                                onClick={() => openInNewTab("/TermsAndConditions")}
                                className="already_sign cursor-pointer"
                                style={{
                                    fontSize: "10px",
                                    color: "#06A9EF",
                                }}
                            >
                                <a>Terms & Conditions</a>
                            </span>{" "}
                            and{" "}
                            <span
                                // onClick={() => router.push("/PrivacyPolicy")}
                                onClick={() => openInNewTab("/PrivacyPolicy")}
                                className="already_sign cursor-pointer"
                                style={{
                                    fontSize: "10px",
                                    color: "#06A9EF",
                                }}
                            >
                                {" "}
                                <a>Privacy Policy.</a>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Sign_in;
