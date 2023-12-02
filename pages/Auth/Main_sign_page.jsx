import React, { useState } from "react";
import Sign_up from "./Sign_up";
import Sign_in from "./Sign_in";

function Main_sign_page() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      <div>{isSignIn ? <Sign_in /> : <Sign_up />}</div>
      <div className="flex ">
        <div className="earthswipe">
          <div className="earth"></div>
        </div>
        <div className="rightEarth">
          <img src="./images/sign_up/Earth.png" alt="" className="earth1" />
          <img
            src="images/employer/Employer_hire_candidates/tethescope.png"
            alt=""
            className="sign_up_tethescope absolute"
          />
        </div>
      </div>
    </div>
  );
}

export default Main_sign_page;
