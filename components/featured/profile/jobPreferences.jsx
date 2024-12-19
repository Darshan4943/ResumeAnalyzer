import React, { useState } from "react";
import { Edit_icon } from "../../../utils/svg";
import JobPrefrenceModal from "./jobPreferenceModel";



const JobPrefrence = ({ userData }) => {
  const [editView, setEditView] = useState(false);
  return (
    <>
      <div className="build_ai ai2" style={{ gap: "16px" }}>
        <div className="flex justify-between w-full">
          <p className="page_headings text-[18px] font-[600]">Job Preferences</p>
          <div onClick={() => setEditView(true)}>
            <Edit_icon />
          </div>
        </div>

        <div className=" w-full">
          <div className=" grid grid-cols-12 gap-4 ">
            {userData?.jobPrefrences?.industry &&
              <div className=" essential_gap sm:col-span-6 col-span-12">
                <p className="text-[14px] font-[400]">Preferred Industry</p>
                <p className="heading_first">{userData?.jobPrefrences?.industry}</p>
              </div>
            }
            {userData?.jobPrefrences?.jobRole &&
              <div className=" essential_gap sm:col-span-6 col-span-12">
                <p className=" text-[14px] font-[400]">Preferred Job Role</p>
                <p className="heading_first">{userData?.jobPrefrences?.jobRole}</p>
              </div>
            }
            {userData?.jobPrefrences?.expectedSalary &&
              <div className="essential_gap sm:col-span-6 col-span-12">
                <p className="text-[14px] font-[400]">Expected Salary</p>
                <p className="heading_first">{userData?.jobPrefrences?.expectedSalary}</p>
              </div>
            }
            {userData?.jobPrefrences?.shift &&
              <div className="essential_gap sm:col-span-6 col-span-12">
                <p className="text-[14px] font-[400]">Preferred Shift</p>
                <p className="heading_first">{userData?.jobPrefrences?.shift}</p>
              </div>

            }



          
            {userData?.jobPrefrences?.department &&
              <div className="essential_gap sm:col-span-6 col-span-12">
                <p className="text-[14px] font-[400]">Preferred Department</p>
                <p className="heading_first">{userData?.jobPrefrences?.department}</p>
              </div>
            }
            {userData?.jobPrefrences?.jobType &&
              <div className="essential_gap sm:col-span-6 col-span-12">
                <p className="text-[14px] font-[400]">Preferred Job Type</p>
                <p className="heading_first">{userData?.jobPrefrences?.jobType}</p>
              </div>
            }
            {userData?.jobPrefrences?.jobMode &&
              <div className="essential_gap sm:col-span-6 col-span-12">
                <p className="text-[14px] font-[400]">Preferred Job Mode</p>
                <p className="heading_first">{userData?.jobPrefrences?.jobMode}</p>
              </div>
            }
            {userData?.jobPrefrences?.preferedLocation.length > 0 && <div className="essential_gap sm:col-span-6 col-span-12">
              <p className="text-[14px] font-[400]">Preferred Work Location</p>
              <div className="flex gap-2">
                {userData?.jobPrefrences?.preferedLocation?.map((locationObj, index) => (
                  <p key={index} className="heading_first">
                    {locationObj.location}
                  </p>
                ))}
              </div>

            </div>
            }
          </div>
        </div>
      </div>
      {editView && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-[90%] ms:w-[75%] top-[100px]">
              <JobPrefrenceModal setEditView={setEditView} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobPrefrence;


