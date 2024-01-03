import AddJobPreference from "@/components/models/addJobPreference";
import { AddIcon, Edit_icon } from "@/utils/svg";
import React, { useState } from "react";

const JobPrefrence = ({ userData }) => {
  const [addJobPreference, setAddJobPreference] = useState(false)
  return (
    <>
      {" "}
      
          <div className="build_ai ai2" style={{ gap: "16px" }}>
            <div className="flex justify-between items-center w-full">
              <p className="page_headings">Job Preferences</p>
              <div onClick={() => setAddJobPreference(true)}>
                <Edit_icon />
              </div>

            </div>

            {userData?.jobPrefrences &&
        Object.values(userData?.jobPrefrences).some(
          (array) => array.length > 0
        ) && (
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
             )}
          </div>
       
      {addJobPreference &&
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[75.08%] ">
              <AddJobPreference addJobPreference={addJobPreference} setAddJobPreference={setAddJobPreference} userData={userData} />
            </div>
          </div>
        </>
      }
    </>
  );
};

export default JobPrefrence;

