import React, { useEffect, useState } from "react";
import ALink from "~/components/alink";

function Recruiter_register() {
  const [infoContinue, setInfoContinue] = useState(1);
  function continuepage(id) {
    setInfoContinue(id);
  }
  const [selectedButton, setSelectedButton] = useState(1);
  const [data, showData] = useState(1);
  function changepage(id) {
    setSelectedButton(id);
    showData(id);
  }
  useEffect(() => {
    if ((infoContinue === 2) || (infoContinue === 3) ) {
    
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [infoContinue]); 

  return (
    <div className="pb-[61px] relative" >
      {/* Register as Recruiter Blue bar start*/}
      <div className="sticky top-[2.6rem] w-[100%] z-[900] pt-[48px]  pb-6 bg-white">
        <div className="flex justify-center align-center bg-[#06A9EF] h-[89px] overflow-hidden">
          <div className="flex justify-center align-center flex-col py-[6px]">
            <div className="text-white text-[40px] font-[600] flex justify-center">
              Register as Recruiter
            </div>
            <div className="text-white text-[16px] font-[500] flex justify-center">
              Start Recruiting with Skilotech
            </div>
          </div>
        </div>
        {/* Register as Recruiter Blue bar end*/}
        {/* document fill status start */}
        <div>
          <div className="flex flex-row items-center justify-center mt-[24px]">
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
            <div className="h-[2px] w-[312px] bg-[#C7C7C7] flex align-center justify-center"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            </svg>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center item-center">
          <div className="flex flex-row justify-between item-center gap-[190px]">
            <div className="text-[#333] text-[16px] font-[500]">
              Recruiter Details
            </div>
            <div className="text-[#333] text-[16px] font-[500]">
              Upload Documents
            </div>
          </div>
        </div>
        {/* document fill status end */}
      </div>

      <div className="">
        <div className={`${infoContinue === 1 ? "ShowContent" : "content"} pt-[10px] ` }>
          <div className="flex justify-center  ">
            <div className="w-[648px] rounded-[16px] px-[24px] py-[24px] flex flex-col gap-[24px] item-between shadow relative bg-white">
              <div className="flex flex-col gap-[8px]">
                <div className="text-[16px] font-[500]">Employment Status</div>
                <div className="flex flex-row gap-[16px]">
                  <button
                    className={`flex justify-center items-center rounded-[30px] text-[14px] font-[400] px-[16px] py-[6px] shadow_btn Recruiter_btn ${selectedButton === 1 ? "activeButton" : "inactiveButton"
                      }`}
                    onClick={() => changepage(1)}
                  >
                    Recruiter Firm
                  </button>
                  <button
                    className={`flex justify-center item-center rounded-[30px] text-[14px] font-[400] px-[16px] py-[6px] shadow_btn Individual_btn ${selectedButton === 2 ? "activeButton" : "inactiveButton"
                      }`}
                    onClick={() => changepage(2)}
                  >
                    Individual Recruiter
                  </button>
                </div>
              </div>

              <div className={`img_parent_head left-[-10rem] z-[-10] ${data === 2 ? "top-[-5rem]" : ""}`}>
                <div className="four_img_cont">
                  <div className="img_contener1">
                    <img
                      src="./images/auth/employer/rec_img1.png"
                      alt=""
                      className="first_img_div"
                    />
                  </div>
                  <div className="img_contener2">
                    <img
                      src="./images/auth/employer/rec_img2.png"
                      alt=""
                      className="sec_img_div"
                    />
                  </div>
                  <div className="img_contener3">
                    <img
                      src="./images/auth/employer/rec_img3.png"
                      alt=""
                      className="three_img_div"
                    />
                  </div>
                  <div className="img_contener4">
                    <img
                      src="./images/auth/employer/rec_img4.png"
                      alt=""
                      className="four_img_div"
                    />
                  </div>
                </div>
              </div>

              <div className={data === 1 ? "showDiv" : "divNone"}>
                <div className="flex flex-col gap-[24px]">
                  <div className="Recruter_sign_up_inps">
                    <div>Firm Name *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Firm name"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Firm Email *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Firm Email"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Password *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="create new Password"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Contact number *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Firm Website URL (Optional)</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter website url"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Year of Establish *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter year of establish"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Firm Location *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your current location"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={data === 2 ? "showDiv" : "divNone"}>
                <div className="flex flex-col gap-[24px]">
                  <div className="Recruter_sign_up_inps flex-row gap-[20px]">
                    <div className="w-[50%]">
                      <div>First name *</div>
                      <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <div>Last name *</div>
                      <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Enter last name"
                        />
                      </div>{" "}
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Email *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Password *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Create new password"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Contact number *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                  <div className="Recruter_sign_up_inps">
                    <div>Current Location *</div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your current location"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <ALink href='/Auth/Sign_up'>
                  <button className="flex justify-center item-center py-[12px] px-[36px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] text-[16px] font-[500] go_back_btn">
                    Go Back
                  </button>
                </ALink>
                <button
                  className="flex justify-center item-center py-[12px] px-[36px] rounded-[12px] bg-[#06A9EF] text-white text-[16px] font-[600] continue_btn"
                  onClick={() => {
                    if (data === 1) {
                      continuepage(2);
                    } else if (data === 2) {
                      continuepage(3);
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center text-[14px] text-[#646464] font-[500] pt-[16px]">
            Already have an account?
            <span className=" text-[14px] text-[#06A9EF] font-[500] already_sign">
              {" "}
              <a href="/Auth/Sign_in"> Sign In</a>
            </span>
          </div>
        </div>

        <div className={`${infoContinue === 2 ? "ShowContent" : "content"} pt-[100px] ` }>
          <div className="w-full flex justify-center relative mb-[5rem]">
            <div className="last_img_parent_head top-[-5rem] -z-10">
              <div className="lastfour_img_cont">
                <div className="last_img_contener1">
                  <img
                    src="./images/auth/employer/last1.png"
                    alt=""
                    className="last_img_1"
                  />
                </div>
                <div className="last_img_contener2">
                  <img
                    src="./images/auth/employer/last2.png"
                    alt=""
                    className="last_img_2"
                  />
                </div>
                <div className="last_img_contener3">
                  <img
                    src="./images/auth/employer/last3.png"
                    alt=""
                    className="last_img_3"
                  />
                </div>
                <div className="last_img_contener4">
                  <img
                    src="./images/auth/employer/last4.png"
                    alt=""
                    className="last_img_4"
                  />
                </div>
                <div className="last_img_contener5">
                  <img
                    src="./images/auth/employer/last5.png"
                    alt=""
                    className="five_img_div"
                  />
                </div>
                <div className="last_img_contener6">
                  <img
                    src="./images/auth/employer/last6.png"
                    alt=""
                    className="six_img_div"
                  />
                </div>
              </div>
            </div>
            <div className="w-[648px] rounded-[16px] px-[24px] py-[24px] flex flex-col gap-[24px] item-between bg-white shadow">
              <div className="Recruter_sign_up_inps flex-row gap-[20px]">
                <div className="w-[50%]">
                  <div>GST No *</div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter GST number"
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <div>Upload Certificate *</div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Upload certificate"
                    />
                  </div>{" "}
                </div>
              </div>
              <div className="Recruter_sign_up_inps flex-row gap-[20px]">
                <div className="w-[50%]">
                  <div>PAN No *</div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter PAN number"
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <div>Upload PAN *</div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input type="text" name="" id="" placeholder="Upload PAN" />
                  </div>{" "}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  className="flex justify-center item-center py-[12px] px-[36px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] text-[16px] font-[500] go_back_btn "
                  onClick={() => continuepage(1)}
                >
                  Go Back
                </button>
                <button className="flex justify-center item-center py-[12px] px-[36px] rounded-[12px] bg-[#06A9EF] text-white text-[16px] font-[600] continue_btn">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${infoContinue === 3 ? "ShowContent" : "content"} pt-[150px] ` }>
          <div className="w-full flex justify-center mb-[10rem] relative ">
            <div className="last_img_parent_head top-[-5rem] -z-10 ">
              <div className="lastfour_img_cont">
                <div className="last_img_contener1">
                  <img
                    src="./images/auth/employer/last1.png"
                    alt=""
                    className="last_img_1"
                  />
                </div>
                <div className="last_img_contener2">
                  <img
                    src="./images/auth/employer/last2.png"
                    alt=""
                    className="last_img_2"
                  />
                </div>
                <div className="last_img_contener3">
                  <img
                    src="./images/auth/employer/last3.png"
                    alt=""
                    className="last_img_3"
                  />
                </div>
                <div className="last_img_contener4">
                  <img
                    src="./images/auth/employer/last4.png"
                    alt=""
                    className="last_img_4"
                  />
                </div>
                <div className="last_img_contener5">
                  <img
                    src="./images/auth/employer/last5.png"
                    alt=""
                    className="five_img_div"
                  />
                </div>
                <div className="last_img_contener6">
                  <img
                    src="./images/auth/employer/last6.png"
                    alt=""
                    className="six_img_div"
                  />
                </div>
              </div>
            </div>
            <div className="w-[648px] rounded-[16px] px-[24px] py-[24px] flex flex-col gap-[24px] item-between bg-white shadow">

              <div className="Recruter_sign_up_inps flex-row gap-[20px]">
                <div className="w-[50%]">
                  <div>PAN No *</div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter PAN number"
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <div>Upload PAN *</div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input type="text" name="" id="" placeholder="Upload PAN" />
                  </div>{" "}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  className="flex justify-center item-center py-[12px] px-[36px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] text-[16px] font-[500] go_back_btn "
                  onClick={() => continuepage(1)}
                >
                  Go Back
                </button>
                <button className="flex justify-center item-center py-[12px] px-[36px] rounded-[12px] bg-[#06A9EF] text-white text-[16px] font-[600] continue_btn">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruiter_register;
