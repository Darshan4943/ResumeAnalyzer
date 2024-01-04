import React, { useState } from "react";
import { Edit_icon } from "../../../../utils/svg";
import JobPrefrenceModal from "./modals/job_preferance_modal";

const JobPrefrence = ({ userData }) => {
  const [editView, setEditView] = useState(false);
  return (
    <>
      <div className="build_ai ai2" style={{ gap: "16px" }}>
        <div className="flex justify-between w-full">
          <p className="page_headings">Job Preferences</p>
          <div onClick={() => setEditView(true)}>
            <Edit_icon />
          </div>
        </div>

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
      {editView && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <JobPrefrenceModal />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobPrefrence;


