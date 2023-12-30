import { timeAgo } from "@/utils/middleware";
import React from "react";

const ResumeList = ({ userData }) => {
  return (
    <div className="build_ai ai2">
      <p className="page_headings">My Resume</p>
      <div className="upload_resume">
        {userData?.resumeUrl?.map((resume) => (
          <div className="upload_resume_parent" key={resume._id}>
            <div className="upload_resume_left">
              <p className="resume-text">{resume?.fileName}</p>
              <p className="resume_text_small">
                Last updated {timeAgo(new Date(resume?.createdAt))}
              </p>
            </div>

            <div className="upload_resume_right">
              <a
                className="resume_button"
                href={resume.url}
                // target="_blank"
              >
                <img src="./images/profile/download.png" alt="" />
              </a>
              <div className="resume_button">
                <img src="./images/profile/delete.png" alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="up_button">
        <button className="build_ai_button">Upload Resume</button>
      </div>
    </div>
  );
};

export default ResumeList;
