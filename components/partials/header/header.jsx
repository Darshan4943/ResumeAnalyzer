import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import CandidateHeader from "./candidateHeader";
import Sign_in from "../../models/Sign_in";
import Sign_up from "../../models/Sign_up";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/firebase"
import axios from "axios";

function Header({ userData }) {

  const auth = getAuth();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email
      };
      console.log(25, userData)
      axios.post('http://localhost:2000/api/user/google/signup', userData).then(res => {
        console.log(res.data)
        localStorage.setItem("authToken", res.data.token);
        console.log('User data sent to the server:', res.data);
        router.push("/home/BeforeLoginHome");
      }).catch(err => {
        console.log(err)
      })

    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Sign-in with Google popup was cancelled by the user.');
      } else {
        console.error('Error signing in with Google:', error.message);
      }
    }
  };

  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
  console.log(9, userDataGlobal);
  const [selectedPage, setSelectedPage] = useState("");
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [login, setlogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  });
  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setSignIn(false)
      setSignUp(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div
      className={
        selectedPage === "/auth/candidate_register" ||
          selectedPage === "/auth/Employer_register" ||
          selectedPage === "/auth/Recruiter_register"
          ? " "
          : "bg-white z-[100] fixed w-[100%] "

      }
      style={{
        boxShadow:
          "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",

      }}
    >
      <div className="flex justify-center items-center customMargins  z-[100]">
        <div className="flex justify-between w-[100%] h-[58px] my-[16px]  gap-2 ">

          {!isLogin ? (
            <>
              <div className="flex items-center gap-9 ">
                <Link href="/">
                  {" "}
                  <img className="h-[58px] w-[172px]" src="/images/logo_skilotech.png" alt="" />
                </Link>



              </div>
              <div className="w-[30%] gap-4  flex justify-end py-2 items-center">
                <div
                  onClick={() => { setSignIn(true); setSignUp(false); }}
                >
                  <button className=" buttonTransparent  rounded-[12px] flex justify-center items-center bg-white text-[#333] py-3 px-9 text-[16px] font-medium border border-transparent hover:border-[#06A9EF]">
                    Sign in
                  </button>
                </div>

                <button
                  onClick={() => { setSignUp(true); setSignIn(false) }}

                  className="rounded-[12px] flex justify-center items-center bg-white text-[#333] py-3 px-9 text-[16px] font-medium border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                >
                  Sign Up
                </button>

                {signIn &&
                  <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                      <div ref={taskRef} className="absolute ">
                        <Sign_in handleGoogle={handleGoogle} />
                      </div>

                    </div>
                  </>
                }

                {signUp &&
                  <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                      <div ref={taskRef} className="absolute ">
                        <Sign_up handleGoogle={handleGoogle} setSignIn={setSignIn} setSignUp={setSignUp} />
                      </div>

                    </div>
                  </>
                }



              </div>
            </>
          ) : (
            <>

              <CandidateHeader />
            </>
          )}
        </div>


      </div>
    </div >
  );
}

export default Header;
