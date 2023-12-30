import React from "react";

const Education = ({ userData }) => {
  return (
    <div className="build_ai ai2">
      <div className="gap">
        <p className="page_headings">Education</p>
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
      {userData?.education?.map((elem) => (
        <div className="work_logo" key={elem._id}>
          {/* <div className="logo_img">
            <img src="./images/profile/logo_1.png" alt="" />
          </div> */}

          <div className="logo_disc">
            <p className="heading_first">{elem.stream}</p>
            <p className="heading_sec">{elem.institute}</p>
            <div className="full_time">
              {elem?.type && (
                <>
                  <p className="sec_head">{elem?.type}</p>
                  <div className="vertical_line"></div>
                </>
              )}

              <p className="sec_head">
                {elem.dateOfComplition}
              </p>
            </div>
            {/* <div className="full_time">
              <p className="sec_head">Pune, Maharashtra, India</p>
              <div className="vertical_line"></div>
              <p className="sec_head">On-site</p>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
