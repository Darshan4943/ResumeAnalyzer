import React from "react";

const Courses = ({ userData }) => {
  return (
    userData?.courses?.length > 0 && (
      <div className="build_ai ai2">
        <div className="gap">
          <p className="page_headings">Certifications</p>
          <div className="add_delete">
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
          </div>
        </div>

        <div className="work_logo">
          <div className="logo_img">
            <img src="./images/profile/certification_logo.png" alt="" />
          </div>

          <div className="logo_disc">
            <p className="heading_first">Essential Skills Program</p>
            <p className="heading_sec">Harappa Education</p>
            <div className="full_time">
              <p className="sec_head">Full Time</p>
              <div className="vertical_line"></div>
              <p className="sec_head">Sept 2019 to 2022</p>
              <div className="vertical_line"></div>
              <p className="sec_head">Pune, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Courses;
