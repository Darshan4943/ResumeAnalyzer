import React, { useState } from "react";
import { motion } from "framer-motion";
import ALink from "~/components/alink";

function Candidate_register() {
  const [tabindex, setTabIndex] = useState(1);

  function updateTab(id) {
    setTabIndex(id);
  }

  return (
    <>
      <div className="register_head my-[24px]">
        <div className="register_cadidate">
          <div className="register_text_parent">
            <div className="register_heding">
              <p className="register_heding_text">Register as candidate</p>
              <p className="register_heding_desc">
                Start your career with Skilotech
              </p>
            </div>
          </div>
        </div>

        <div className="details_parent">
          <div className="details_radio">
            {tabindex >= 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
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
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
              </svg>
            )}

            <p
              className="bg_line"
              style={{
                backgroundColor: tabindex >= 2 ? "#06A9EF" : "#C7C7C7",
              }}
            ></p>

            {tabindex >= 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
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
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
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
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
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
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
              </svg>
            )}
          </div>
          <div className="detail_names">
            <p className="detail_names_text">Personal details</p>
            <p className="detail_names_text">Education details</p>
            <p className="detail_names_text">Professional details</p>
          </div>
        </div>
      </div>

      {/* personal details form start */}
      {tabindex === 1 && (
        <div className={"show-content"}>
          <motion.div className="personal_details back_img">
            <div className="personal_details_form">
              <img
                className="mail_img"
                src="./images/auth/candidate/Mail.png"
                alt=""
              />

              <img
                className="phone_img "
                src="./images/auth/candidate/Phone.png"
                alt=""
              />

              <img
                className="location_img"
                src="./images/auth/candidate/Location.png"
                alt=""
              />

              <img
                className="data_img"
                src="./images/auth/candidate/Data.png"
                alt=""
              />
              <img
                className="Group11"
                src="./images/auth/candidate/Group11.png"
                alt=""
              />
              <img
                className="Group12"
                src="./images/auth/candidate/Group12.png"
                alt=""
              />
              <img
                className="Group13"
                src="./images/auth/candidate/Group13.png"
                alt=""
              />
              <img
                className="Group14"
                src="./images/auth/candidate/Group14.png"
                alt=""
              />
              <img
                className="Group15"
                src="./images/auth/candidate/Group15.png"
                alt=""
              />
              <img
                className="Group16"
                src="./images/auth/candidate/Group16.png"
                alt=""
              />

              <div className="personal_name_parent">
                <div className="personal_name">
                  <p className="form_text_heading">
                    First name <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="first_name"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="personal_name">
                  <p className="form_text_heading">
                    Last name <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="first_name"
                    placeholder="Enter Last name"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Email <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Password <span className="star">*</span>
                  </p>
                  <input
                    type="password"
                    name=""
                    id="single_input"
                    placeholder="Create new password"
                  />
                  <img
                    className="icon"
                    src="./images/auth/candidate/visibility_off.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Contact Number <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter Contact Number"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Date Of Birth <span className="star">*</span>
                  </p>
                  <input
                    type="date"
                    name=""
                    id="single_input"
                    placeholder="Enter Contact Number"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Gender <span className="star">*</span>
                  </p>
                  <div className="gender_button">
                    <button className="gen_button">Male</button>
                    <button className="gen_button">Female</button>
                    <button className="gen_button">Other</button>
                  </div>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Current Location <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter Your Location"
                  />
                  <img
                    className="icon"
                    src="./images/auth/candidate/location_on.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Work Status <span className="star">*</span>
                  </p>
                  <div className="gender_button">
                    <button className="gen_button">Experienced</button>
                    <button className="gen_button">Fresher</button>
                  </div>
                </div>
              </div>
              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Upload Resume <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Please Upload Resume in PDF/DOC Format"
                  />
                  <img
                    className="icon"
                    src="./images/auth/candidate/upload.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="bottom_buttons">
              <ALink href='/Auth/Sign_up'>
                <button className="buttons" id="border_button">
                  Go Back
                </button>
                </ALink>
                <button
                  className="buttons"
                  id="border_button"
                  onClick={() => {
                    setTabIndex(2);
                    window.scroll(0, 0);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
          <div className="already_text_parent">
            <p className="already_text">
              Already have an account? <span id="sign_in">Sign In</span>
            </p>
          </div>
        </div>
      )}

      {tabindex === 2 && (
        <div className="show-content">
          <div className="personal_details " style={{ paddingBottom: "96px" }}>
            <div className="personal_details_form">
              <img
                className="mail_img"
                src="./images/auth/candidate/Group_1.png"
                alt=""
                style={{
                  right: "-14rem",
                  top: "2rem",
                  width: "26%",
                  animationDelay: 0.2,
                }}
              />

              <img
                className="group_2"
                src="./images/auth/candidate/Group_2.png"
                alt=""
              />

              <img
                className="phone_img "
                src="./images/auth/candidate/Group_3.png"
                alt=""
                style={{ width: "26%", top: "37rem", right: "-19rem" }}
              />

              <img
                className="location_img"
                src="./images/auth/candidate/Group_4.png"
                alt=""
                style={{ top: "8rem", left: "-7.2rem", width: "17%" }}
              />

              <img
                className="data_img"
                src="./images/auth/candidate/Group_5.png"
                alt=""
                style={{ left: "-16rem", top: "22rem", width: "22%" }}
              />

              <img
                className="group_6"
                src="./images/auth/candidate/Group_6.png"
                style={{ position: "absolute" }}
                alt=""
              />

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">Highest Education</p>
                  <div className="education_button">
                    <button className="gen_button">10th or below</button>
                    <button className="gen_button">12 pass</button>
                    <button className="gen_button">Diploma</button>
                    <button className="gen_button">Graduate</button>
                    <button className="gen_button">Post Graduates</button>
                  </div>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Select Degree"
                  />
                  <img
                    style={{ width: "10px", height: "8px", top: "45%" }}
                    className="icon"
                    src="./images/auth/candidate/arrow_forward_ios.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    University Name <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter University Name"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Collage Name <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter Collage Name"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Date Of Complition <span className="star">*</span>
                  </p>
                  <input
                    type="date"
                    name=""
                    id="single_input"
                    placeholder="Enter Contact Number"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p
                    style={{ fontWeight: "600" }}
                    className="form_text_heading"
                  >
                    Additional Information
                  </p>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Relevant Course or Certification
                    <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Academic Honors or Awards <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="bottom_buttons">
                <button
                  className="buttons"
                  id="border_button"
                  onClick={() => {
                    setTabIndex(1);
                    window.scroll(0, 0);
                  }}
                >
                  Go Back
                </button>
                <button
                  className="buttons"
                  id="border_button"
                  onClick={() => {
                    setTabIndex(3);
                    window.scroll(0, 0);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tabindex === 3 && (
        <div className="personal_details_all">
          <div className="personal_details" style={{ paddingBottom: "96px" }}>
            <div className="personal_details_form">
              <img
                className="mail_img"
                src="./images/auth/candidate/Group_7.png"
                alt=""
                style={{
                  right: "-13rem",
                  width: "31%",
                  animationDelay: 0.2,
                  top: "11rem",
                }}
              />

              <img
                className="phone_img "
                src="./images/auth/candidate/Group_8.png"
                alt=""
                style={{ width: "39%", top: "46rem", right: "-16rem" }}
              />

              <img
                className="location_img"
                src="./images/auth/candidate/Group_9.png"
                alt=""
                style={{ top: "3rem", left: "-14rem", width: "36%" }}
              />

              <img
                className="data_img"
                src="./images/auth/candidate/Group_10.png"
                alt=""
                style={{ left: "-17rem", width: "44%", top: "33rem" }}
              />

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Employment Status <span className="star">*</span>
                  </p>
                  <div className="gender_button">
                    <button className="gen_button">Employed</button>
                    <button className="gen_button">Unemployed</button>
                  </div>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name" style={{ gap: "10px" }}>
                  <p className="form_text_heading">
                    Employment Status <span className="star">*</span>
                  </p>
                  <div className="gender_button">
                    <label for="years"></label>
                    <select name="2 years" id="years">
                      <option value="1 ears">1 years</option>
                      <option value="2 years">2 years</option>
                      <option value="2 years">2 years</option>
                      <option value="2 years">2 years</option>
                    </select>

                    <label for="years"></label>
                    <select name="2 years" id="years">
                      <option value="1 ears">1 years</option>
                      <option value="2 years">2 years</option>
                      <option value="2 years">2 years</option>
                      <option value="2 years">2 years</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Company Name <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter Company Name"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Job tittle <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter job tittle"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Job location <span className="star">*</span>
                  </p>
                  <input
                    type="search"
                    name=""
                    id="single_input"
                    placeholder="Enter job location"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Date Of joining <span className="star">*</span>
                  </p>
                  <input
                    type="date"
                    name=""
                    id="single_input"
                    placeholder="Enter date of joining"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Key skills <span className="star">*</span>
                  </p>
                  <input type="text" name="" id="single_input" placeholder="" />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Current CTC <span className="star">*</span>
                  </p>
                  <input
                    type="text"
                    name=""
                    id="single_input"
                    placeholder="Yearly LPA"
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Notice Period <span className="star">*</span>
                  </p>
                  <div className="notice_period">
                    <div className="radio">
                      <input type="radio" />
                      15 Days or less
                    </div>
                    <div className="radio">
                      <input type="radio" />
                      15 Days or less
                    </div>
                    <div className="radio">
                      <input type="radio" />
                      15 Days or less
                    </div>
                    <div className="radio">
                      <input type="radio" />
                      15 Days or less
                    </div>
                    <div className="radio">
                      <input type="radio" />
                      15 Days or less
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottom_buttons">
                <button
                  className="buttons"
                  id="border_button"
                  onClick={() => {
                    setTabIndex(2);
                    window.scroll(0, 0);
                  }}
                >
                  Go Back
                </button>
                <button className="buttons" id="border_button">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
}

export default Candidate_register;
