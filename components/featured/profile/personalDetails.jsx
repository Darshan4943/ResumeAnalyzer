import React, { useState } from "react";


import { Edit_icon } from "../../../utils/svg";
import Edit_personal_Dtls from "./editPersonalDetails";
const PersonalDetails = ({ userData }) => {
  const [addEditPop, setaddEditPop] = useState(false);

  
  return (
    <>
      <div className="build_ai ai2" style={{ gap: "16px" }}>
        <div className="page_headings flex items-center justify-between w-full text-[16px] font-[600]">
          Personal details
          <div onClick={() => setaddEditPop(true)}>
            <Edit_icon />
          </div>
        </div>
        <div className="job_preference">
          <div className="job_preference_left">
            {userData?.basics?.gender &&
              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Gender</p>
                <p className="heading_first">{userData?.basics?.gender}</p>
              </div>
            }  {userData?.basics?.gender &&
              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Marital status</p>
                <p className="heading_first">
                  {userData?.basics?.maritalStatus
                    ? userData?.basics?.maritalStatus
                    : "-"}
                </p>
              </div>
            }
            {userData?.basics?.dob &&
              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Date of birth</p>
                <p className="heading_first">
                  {userData?.basics?.dob ? userData?.basics?.dob : "-"}
                  { }
                </p>
              </div>
            }
           
              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Differently Abled</p>
                <p className="heading_first">
                  {userData?.basics?.specialyAbled?.isSpecialyAbled
                    ? "Yes"
                    : "No"}
                </p>
                {userData?.basics?.specialyAbled?.isSpecialyAbled && (
                  <div className="essential_gap">
                    <p className="heading_first font-[400]">
                      (
                      {userData?.basics?.specialyAbled
                        ? userData?.basics?.specialyAbled?.specialyAbledDescription
                        : "-"}
                      )
                    </p>
                  </div>
                )}
              </div>
          
          </div>
          <div className="job_preference_right">
           
              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Career break</p>
                <p className="heading_first">
                  {userData?.basics?.isCareerBreak ? "Yes" : "No"}
                </p>
                {userData?.basics?.isCareerBreak === true && (
                  <div className="essential_gap">
                    <p className="heading_first font-[400]">
                      (
                      {userData?.basics?.isCareerBreakReason
                        ? userData?.basics?.isCareerBreakReason
                        : "-"}
                      )
                    </p>
                  </div>
                )}
              </div>
            
   

              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Work permit</p>
                <p className="heading_first">
                  {userData?.basics?.workPermit?.haveWorkPermit ? "Yes" : "No"}
                  {userData?.basics?.workPermit.workPermitDescription && (
                    <div className="essential_gap">
                      <p className="heading_first font-[400]">
                        (
                        {userData?.basics?.workPermit.workPermitDescription
                          ? userData?.basics?.workPermit.workPermitDescription
                          : "-"}
                        )
                      </p>
                    </div>
                  )}
                </p>
              </div>
         
            {userData?.basics?.address &&
              <div className="essential_gap">
                <p className="text-[14px] font-[400]">Address</p>
                <p className="heading_first">
                  {userData?.basics?.address ? userData?.basics?.address : "-"}
                </p>
              </div>
            }
          </div>
        </div>
      </div>
      {addEditPop && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] ms:w-[75%] w-[90%] top-[100px]">
              <Edit_personal_Dtls setaddWebsites={setaddEditPop} />
            </div>
          </div>

        </>
      )}
    </>
  );
};

export default PersonalDetails;
