import React from "react";

const PersonalDetails = ({ userData }) => {
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
    <div className="build_ai ai2" style={{ gap: "16px" }}>
      <p className="page_headings">Personal details</p>
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
            </p>
          </div>
          <div className="essential_gap">
            <p className="sec_head">Differently able</p>
            <p className="heading_first">
              {userData?.basics?.specialyAbled?.isSpecialyAbled
                ? userData?.basics?.specialyAbled?.isSpecialyAbled
                  ? "Yes"
                  : "No"
                : "-"}
            </p>
          </div>
        </div>
        <div className="job_preference_right">
          <div className="essential_gap">
            <p className="sec_head">Career break</p>
            <p className="heading_first">
              {userData?.basics?.isCareerBreak
                ? userData?.basics?.isCareerBreak
                  ? "Yes"
                  : "No"
                : "-"}
            </p>
          </div>
          <div className="essential_gap">
            <p className="sec_head">Work permit</p>
            <p className="heading_first">
              {userData?.basics?.haveWorkPermit
                ? userData?.basics?.haveWorkPermit
                  ? "Yes"
                  : "No"
                : "-"}
            </p>
          </div>
          <div className="essential_gap">
            <p className="sec_head">Address</p>
            <p className="heading_first">
              {userData?.basics?.Address ? userData?.basics?.Address : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
