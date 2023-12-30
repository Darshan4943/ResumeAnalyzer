import React from "react";

const WorkExperiance = ({ userData }) => {
  console.log(userData.workExperiance);
  return (
    <>
      {userData.workExperiance?.length > 0 && (
        <div className="build_ai ai2">
          <div className="gap">
            <p className="page_headings">Work Experience</p>
            {/* <div className="add_delete">
              <img
                style={{ width: "24px" }}
                src="./images/profile/add.png"
                alt=""
              />
              <img
                style={{ width: "24px" }}
                src="./images/profile/edit.png"
                alt=""
              />
            </div> */}
          </div>
          {userData?.workExperiance?.map((job) => (
            <div className="work_logo">
              {/* <div className="logo_img">
   <img src="./images/profile/logo_1.png" alt="" />
 </div> */}

              <div className="logo_disc">
                <p className="heading_first">{job?.companyName}</p>
                <p className="heading_sec">{job?.jobTitle}</p>
                <div className="full_time">
                  {job?.jobType && (
                    <>
                      <p className="sec_head">{job?.jobType}</p>
                      <div className="vertical_line"></div>
                    </>
                  )}
                  {job?.jobDuration?.length > 0 ? (
                    <p className="sec_head">Sept 2019 to 2022</p>
                  ) : (
                    <p className="sec_head">{job.dateOfJoining}</p>
                  )}
                </div>
                <div className="full_time">
                  <p className="sec_head">{job?.jobLocation}</p>
                  {job?.jobMode && (
                    <>
                      <div className="vertical_line"></div>
                      <p className="sec_head">{job?.jobMode}</p>
                    </>
                  )}
                </div>

                <p className="sec_head">{job?.workDescription}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WorkExperiance;
