import React, { useEffect, useState } from "react";
import Sign_up from "../../components/models/roleSelect";
import Sign_in from "../../components/models/Sign_in";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../utils/firebase";
import RoleSelect from "../../components/models/roleSelect";
function Main_sign_page() {
  const { signin, signup, role } = useRouter().query;

  const [isSignIn, setIsSignIn] = useState(true);
  
  useEffect(() => {
    if (signin) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, [signin, signup]);
 

  return (
    <div>
      <div className=" justify-center relative w-[100%] flex overflow-hidden">


        <div className=" z-100">

          <RoleSelect  signin={signin} signup={signup} />
        </div>


      </div>
    </div>
  );
}

export default Main_sign_page;
