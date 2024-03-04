import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { data } from "autoprefixer";


import { AnimatePresence, motion } from "framer-motion";
import HeaderSidebar from "./headerSidebar";
import Sign_in from "../../models/Sign_in";
import Sign_up from "../../models/Sign_up";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { popupNotVisible } from "../../../Redux/actions/user";
import axios from "axios";


function CandidateMobileHeader() {
    const popupState = useSelector(state => state.popupState)
    const dispatch = useDispatch()
    const auth = getAuth();
    const [selectedPage, setSelectedPage] = useState("");
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    const [signIn, setSignIn] = useState(false)
    const [signUp, setSignUp] = useState(false)

    const [login, setlogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);


    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          const userData = {
            name: user.displayName,
            email: user.email
          };
         
          axios.post('https://freedygoservices.in/api/skiloteckuser/user/google/signup', userData).then(res => {
            localStorage.setItem("authToken",JSON.stringify( res.data));
            console.log('User data sent to the server:', res.data);
            router.push("/home/BeforeLoginHome");
            window.location.reload();
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

    useEffect(() => {
        if (popupState == true) {
    
          setSignIn(true)
        } else {
          setSignIn(false)
    
        }
      }, [popupState]);
    

    useEffect(() => {
        setSelectedPage(router.pathname);
    }, [router.pathname]);

    const taskRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {
          
            setSignIn(false)
            setSignUp(false)
            dispatch(popupNotVisible())
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);



    const handleLogOut = () => {
        setIsLogin(false);
        router.push("/");
        toggleDropdown();
        localStorage.clear();
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
    },[]);



    return (
        <>
            <div className="flex p-2 justify-between fixed w-[100%] bg-white z-[100]  " style={{ boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)" }}>
                <div className="flex gap-2 items-center">
                    <>
                        {isLogin &&
                            <div onClick={() => setIsSidebar(true)}>
                                <img src="/images/home/menu.png" alt="" className="w-[30px] h-[30px] object-contain" />
                            </div>
                    }

                        <div onClick={() => router.push("/")}>
                            <img src="/images/logo_skilotech.png" alt="" className="w-[123px] h-[40px] object-contain" />

                        </div>
                    </>
                </div>

                {isLogin ?

                   ""
                    :

                    <button   onClick={() => { setSignIn(true); setSignUp(false); }} className="px-4 py-2 border border-[#06A9EF] rounded-[8px] font-[500]">
                        Sign In
                    </button>

                }
            </div>

            {signIn &&
                  <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                      <div ref={taskRef} className="absolute ">
                        <Sign_in handleGoogle={handleGoogle} setSignIn={setSignIn} setSignUp={setSignUp}/>
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
            <AnimatePresence>
                {isSidebar && (
                    <>

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.5 }}
                           
                            className="absolute z-[2000] w-full mt-[-4rem]  "
                            style={{
                                background: "rgba(255, 255, 255, 0.5)",
                                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                                backdropFilter: "blur(10px)",
                                ...(navigator.userAgent.includes("Safari") &&
                                    !navigator.userAgent.includes("Chrome") && {
                                    WebkitBackdropFilter: "blur(10px)",
                                }),
                                willChange: 'transform',
                            }}
                        >
                            <HeaderSidebar selectedPage={selectedPage} setIsSidebar={setIsSidebar} setIsLogin={setIsLogin} isLogin={isLogin} />
                        </motion.div>

                    </>
                )}

            </AnimatePresence>


        </>
    )
}
export default CandidateMobileHeader;