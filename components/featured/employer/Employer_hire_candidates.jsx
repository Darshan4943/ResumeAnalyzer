import React, { useState, useEffect } from "react";
// import "./EarthAnimation.css";
const Employer_hire_candidates = () => {
  const divs = [
    <div className="Employer_hire_candidates_images_container">
      <img
        src="images/employer/Employer_hire_candidates/earth1.png"
        alt=""
        className="Employer_hire_candidates_images"
      />
      <div id="earth"></div>
      <img src="images/employer/Employer_hire_candidates/tethescope.png" alt="" className="tethescope" />
    </div>,
    <div className="Employer_hire_candidates_images_container">
      <img
        src="images/employer/Employer_hire_candidates/earth2.png"
        alt=""
        className="Employer_hire_candidates_images"
      />
      <div id="earth"></div>
      <img src="images/employer/Employer_hire_candidates/tethescope.png" alt="" className="tethescope" />
    </div>,
    <div className="Employer_hire_candidates_images_container">
      <img
        src="images/employer/Employer_hire_candidates/earth3.png"
        alt=""
        className="Employer_hire_candidates_images"
      />
      <div id="earth"></div>
      <img src="images/employer/Employer_hire_candidates/tethescope.png" alt="" className="tethescope" />
    </div>,
    <div className="Employer_hire_candidates_images_container">
      <img
        src="images/employer/Employer_hire_candidates/earth4.png"
        alt=""
        className="Employer_hire_candidates_images"
      />
      <div id="earth"></div>
      <img src="images/employerEmployer_hire_candidates//tethescope.png" alt="" className="tethescope" />
    </div>,
    <div className="Employer_hire_candidates_images_container">
      <img
        src="images/employer/Employer_hire_candidates/earth5.png"
        alt=""
        className="Employer_hire_candidates_images"
      />
      <div id="earth"></div>
      <img src="images/employer/Employer_hire_candidates/tethescope.png" alt="" className="tethescope" />
    </div>,
    <div className="Employer_hire_candidates_images_container">
      <img
        src="images/employer/Employer_hire_candidates/earth6.png"
        alt=""
        className="Employer_hire_candidates_images"
      />
      <div id="earth"></div>
      <img src="images/employer/Employer_hire_candidates/tethescope.png" alt="" className="tethescope" />
    </div>,
  ];
  const [currentDivIndex, setCurrentDivIndex] = useState(0);

  // Function to advance to the next div
  const nextDiv = () => {
    setCurrentDivIndex((currentDivIndex + 1) % divs.length);
  };

  useEffect(() => {
    const interval = setInterval(nextDiv, 1200); // Change div every 2 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentDivIndex]);

  return (
    <div className="Employer_hire_candidates_container customMargins">
      <div className="Employer_hire_candidates_images_main_container">
        {divs[currentDivIndex]}
      </div>
      <div className="Employer_hire_candidates_wrapper">
        <div className="hire_candidates_head">
          Hire candidates across the world
        </div>
        <div className="hire_candidates_2nd_head">
          Connect talent and employers from around the world
        </div>
        <div className="hire_candidates_para">
          Discover top talent from around the world with Skilotech. <br />{" "}
          Connect with candidates, navigate international hiring <br />
          regulations, and build a diverse, workforce effortlessly.
        </div>
        <div>
          <button className="hire_candidates_btn">Register Now</button>
        </div>
      </div>
    </div>
  );
};

export default Employer_hire_candidates;
