import React, { useState } from "react";
import Sign_up from "./Sign_up";
import Sign_in from "./Sign_in";
import { useRouter } from "next/router";

function Main_sign_page() {
  const { signin, signup } = useRouter().query;

  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      <div>
        {signin && <Sign_in />}
        {signup && <Sign_up />}
      </div>
      <div className="flex ">
        {/* <div className="earthswipe">
          <div
            className="earth"
            style={{
              left:signin? "0%":"unset",
              right:signin? "unset":"20%",
              transition:'all 2s'
            }}
          ></div>
        </div> */}
        {/* <div className="rightEarth">
          <img src="/images/sign_up/Earth.png" alt="" className="earth1" />
          <img
            src="images/employer/Employer_hire_candidates/tethescope.png"
            alt=""
            className="sign_up_tethescope absolute"
            style={{
              right: "-20%",
            }}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Main_sign_page;
