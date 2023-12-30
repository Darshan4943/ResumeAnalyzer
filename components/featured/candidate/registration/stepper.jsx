import React from "react";

const Stepper = ({ tabindex }) => {
  return (
    <>
      <div className="details_parent">
        <div className="details_radio">
          {tabindex >= 2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
              <circle cx="12" cy="12" r="8" fill="#06A9EF" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            </svg>
          )}

          <p
            className="bg_line"
            style={{
              backgroundColor: tabindex >= 3 ? "#06A9EF" : "#C7C7C7",
            }}
          ></p>

          {tabindex >= 3 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
              <circle cx="12" cy="12" r="8" fill="#06A9EF" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            </svg>
          )}

          <p
            className="bg_line"
            style={{
              backgroundColor: tabindex >= 4 ? "#06A9EF" : "#C7C7C7",
            }}
          ></p>

          {tabindex >= 4 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
              <circle cx="12" cy="12" r="8" fill="#06A9EF" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            </svg>
          )}
        </div>
        <div className="detail_names">
          <p className="detail_names_text">Personal details</p>
          <p className="detail_names_text">Education details</p>
          <p className="detail_names_text">Professional details</p>
        </div>
      </div>
    </>
  );
};

export default Stepper;
