import React from "react";

const JobPrefrence = ({ userData }) => {
  return (
    <>
      {" "}
      {userData?.jobPrefrences &&
        Object.values(userData?.jobPrefrences).some(
          (array) => array.length > 0
        ) && (
          <div className="build_ai ai2" style={{ gap: "16px" }}>
            <p className="page_headings">Job Preferences</p>
            <div className="job_preference">
              <div className="job_preference_left">
                {/* {job_prefer.map((job_prefer) => (
                  <div className="essential_gap">
                    <p className="sec_head">{job_prefer.a}</p>
                    <p className="heading_first">{job_prefer.b}</p>
                  </div>
                ))} */}
              </div>
              <div className="job_preference_right">
                {/* {job_prefer.map((job_prefer) => (
                  <div className="essential_gap">
                    <p className="sec_head">{job_prefer.c}</p>
                    <p className="heading_first">{job_prefer.d}</p>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default JobPrefrence;
