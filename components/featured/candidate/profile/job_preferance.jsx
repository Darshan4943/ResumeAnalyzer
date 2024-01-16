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

            <div className="essential_gap">
              <p className="sec_head">Preferred Industry</p>
              <p className="heading_first">{userData?.jobPrefrences?.industry}</p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Preferred Job Role</p>
              <p className="heading_first">{userData?.jobPrefrences?.jobRole}</p>
            </div>
           
            
            <div className="essential_gap">
              <p className="sec_head">Expected Salary</p>
              <p className="heading_first">{userData?.jobPrefrences?.expectedSalary}</p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Preferred Work Location</p>
              <div className="flex gap-2">
                {userData?.jobPrefrences?.preferedLocation?.map((locationObj, index) => (
                  <p key={index} className="heading_first">
                    {locationObj.location}
                  </p>
                ))}
              </div>
            </div>

          </div>
          <div className="job_preference_right">
            <div className="essential_gap">
              <p className="sec_head">Preferred Department</p>
              <p className="heading_first">{userData?.jobPrefrences?.department}</p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Preferred Job Type</p>
              <p className="heading_first">{userData?.jobPrefrences?.jobType}</p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Preferred Job Mode</p>
              <p className="heading_first">{userData?.jobPrefrences?.jobMode}</p>
            </div>
            {userData?.jobPrefrences?.shift &&
            <div className="essential_gap">
              <p className="sec_head">Preferred Shift</p>
              <p className="heading_first">{userData?.jobPrefrences?.shift}</p>
            </div>
            }
          </div>
        </div>
      </div>
      {editView && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-[90%] ms:w-[75%]">
              <JobPrefrenceModal setEditView={setEditView} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobPrefrence;


