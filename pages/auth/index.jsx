import React, { useEffect, useState } from "react";
import Sign_up from "../../components/models/Sign_up";
import Sign_in from "../../components/models/Sign_in";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../utils/firebase";
function Main_sign_page() {
  const { signin, signup } = useRouter().query;
  const [isSignIn, setIsSignIn] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    if (signin) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, [signin, signup]);

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

  return (
    <div>
      <div className=" justify-center relative w-[100%] flex overflow-hidden">
        <motion.div className="earthswipe object-contain -z-10">
          <motion.div
            initial={isSignIn ? { left: "0%" } : { right: "-25%" }}
            animate={
              isSignIn
                ? { right: "-25%", left: "" }
                : { left: "", right: "-25%" }
            }
            transition={{ duration: 1 }}
            className="earth"
          ></motion.div>
        </motion.div>
        <div className=" z-100">
          {signin && (
            <Sign_in
              setIsSignIn={setIsSignIn}
              handleGoogle={handleGoogle}
              googleLoading={googleLoading}
            />
          )}
          {signup && <Sign_up handleGoogle={handleGoogle} />}
        </div>

        <div className="rightEarth -z-10">
          <motion.img
            initial={isSignIn ? { right: "-7%" } : { left: "-0%", right: "" }}
            animate={isSignIn ? { left: "-0%", right: "" } : { right: "-7%" }}
            transition={{ duration: 1 }}
            src="/images/Earth.png"
            alt=""
            className="earth1 object-contain"
          />
          <motion.img
            initial={isSignIn ? { right: "-24%" } : { left: "7%", right: "" }}
            animate={isSignIn ? { left: "7%", right: "" } : { right: "-24%" }}
            transition={{ duration: 1 }}
            src="images/employer/Employer_hire_candidates/tethescope.png"
            alt=""
            className="sign_up_tethescope object-contain absolute"
            style={{
              right: "-26%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Main_sign_page;
