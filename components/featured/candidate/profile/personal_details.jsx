import React, { useState } from "react";
import { Edit_icon } from "@/utils/svg";
import Edit_personal_Dtls from "./modals/Edit_personal_Dtls";
const PersonalDetails = ({ userData }) => {
  const [addEditPop, setaddEditPop] = useState(false);
  console.log(6,userData);
  const heading_data = [
    {
      a: "Gender",
      b: "Male",
      c: "Career break",
      d: "No",
    },
    {
      a: "Marital status",
      b: "Single / unmarried",
      c: "Work permit",
      d: "No",
    },
    {
      a: "Date of birth",
      b: "02 Apr 1999",
      c: "Address",
      d: "VITTHAL NAGAR, SPINE ROAD CHIKHALI, PRADHIKARAN, pimpri-chinchwad, 411062",
    },
    {
      a: "Differently able",
      b: "No",
      // c:'',
      // d:''
    },
  ];
  return (
    <>
      <div className="build_ai ai2" style={{ gap: "16px" }}>
        <div className="page_headings flex items-center justify-between w-full">
          Personal details
          <div onClick={() => setaddEditPop(true)}>
            <Edit_icon />
          </div>
        </div>
        <div className="job_preference">
          <div className="job_preference_left">
            <div className="essential_gap">
              <p className="sec_head">Gender</p>
              <p className="heading_first">{userData?.basics?.gender}</p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Marital status</p>
              <p className="heading_first">
                {userData?.basics?.maritalStatus
                  ? userData?.basics?.maritalStatus
                  : "-"}
              </p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Date of birth</p>
              <p className="heading_first">
                {userData?.basics?.dob ? userData?.basics?.dob : "-"}
                {}
              </p>
            </div>
            <div className="essential_gap">
              <p className="sec_head">Differently Abled</p>
              <p className="heading_first">
                {userData?.basics?.specialyAbled?.isSpecialyAbled
                  ? "Yes"
                  : "No"}
              </p>
              {userData?.basics?.specialyAbled?.isSpecialyAbled && (
                <div className="essential_gap">
                  <p className="heading_first">
                    (
                    {userData?.basics?.specialyAbled
                      ? userData?.basics?.specialyAbled?.discription
                      : "-"}
                    )
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="job_preference_right">
            <div className="essential_gap">
              <p className="sec_head">Career break</p>
              <p className="heading_first">
                {userData?.basics?.isCareerBreak ? "Yes" : "No"}
              </p>
              {userData?.basics?.isCareerBreak === true && (
                <div className="essential_gap">
                  <p className="heading_first">
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
              <p className="sec_head">Work permit</p>
              <p className="heading_first">
                {userData?.basics?.workPermit?.haveWorkPermit ? "Yes" : "No"}
                {userData?.basics?.workPermit.discription && (
                  <div className="essential_gap">
                    <p className="heading_first">
                      (
                      {userData?.basics?.workPermit.discription
                        ? userData?.basics?.workPermit.discription
                        : "-"}
                      )
                    </p>
                  </div>
                )}
              </p>
            </div>

            <div className="essential_gap">
              <p className="sec_head">Address</p>
              <p className="heading_first">
                {userData?.basics?.address ? userData?.basics?.address : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {addEditPop && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] ms:w-[75%] w-[90%]">
              <Edit_personal_Dtls setaddWebsites={setaddEditPop} />
            </div>
          </div>
          
        </>
      )}
    </>
  );
};

export default PersonalDetails;
