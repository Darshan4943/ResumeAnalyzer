import React, { useState } from "react";
import Job_card from "./Job_card";
import AppliedJobs from "~/components/featured/candidate/afterLogin/home/AppliedJobs";
import SavedJobs from "~/components/featured/candidate/afterLogin/home/SavedJobs";
function AfterLoginHome() {

  const userProfileData = JSON.parse(localStorage.getItem("userProfileData"));

  const [toggle, setToggle] = useState(0)

  return (

    <div className="bg-[#F9F9F9]">

      <div className=" relative bg-[#F9F9F9]  ">
        <div className="  ">
          <div className="customMargins py-5 flex flex-row justify-between items-center ">
            <div className="justify-center items-center w-[29%] items-between">
              <div className="flex flex-row gap-[16px] py-[8px]  ">
                <div className="flex w-[40%] h-[110px]  items-center">
                  <img
                    src="./images/afterLoginHome/profile_pic.png"
                    alt=""
                    className="w-[120px] h-[120px]"
                  />
                </div>
                <div className="flex flex-col gap-[12px] items-center justify-center w-[60%] leading-[15px]">
                  <div className="flex  flex-col gap-[12px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex flex-col gap-[8px]">
                        <div className="text-[#333] text-[18px] font-[500]">
                          {userProfileData.firstName} {userProfileData.lastName}
                        </div>
                        <div className="text-[#333] text-[14px] font-[400]">
                          BSc Computer Science @ Pune University
                        </div>
                      </div>
                      <div className="text-[#646464] text-[12px] font-[400]">
                        Last updated 1 m ago
                      </div>
                    </div>
                    <div className="text-[#06A9EF] text-[14px] font-[600]">
                      View & Update Profile
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-[24%]">
              <div className="flex flex-row gap-[16px]">
                <div className="h-[84px] w-[30%]">
                  <img
                    src="./images/afterLoginHome/profile_per..png"
                    alt=""
                    className=""
                  />
                </div>
                <div className="flex items-center w-[70%]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="text-[#333] text-[20px] font-[500] ">
                      Profile Score
                    </div>
                    <div className="text-[#262626] text-[12px] font-[400]">
                      Improve your profile score, to get more recruiter attention.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-[8px]  flex flex-row gap-[24px] w-[41%]">
              <div className="w-[35%]">
                <div className="ai_images ">
                  <img
                    className="name_resume "
                    src="./images/afterLoginHome/name_resume.png"
                    alt=""
                  />
                  <img
                    className="david_resume "
                    src="./images/afterLoginHome/david_resume.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex items-start w-[60%] ">
                <div className="flex  flex-col gap-[16px]">
                  <div className="flex  flex-col gap-[8px]">
                    <div className="text-[#333] text-[18px] font-[500]">
                      Build AI Powered Resume
                    </div>
                    <div className="text-[#262626] text-[12px] font-[400]">
                      Create an outstanding resume in minutes or download a
                      pre-designed one tailored to your Skilotech profile
                    </div>
                  </div>
                  <div>
                    <button className="flex py-[8px] px-[18px] items-center justify-center rounded-[6px]  bg-[#06A9EF] border-[#06A9EF] text-[#fff] text-[14px] font-[600]">
                      Build your Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#BCECFF] sticky top-[5.6rem] z-50">
          <div className="customMargins flex flex-row  gap-[16px] py-[8px]">
            <div className={`flex flex-row py-[8px] px-[16px] gap-[8px] items-center justify-center ${toggle === 0 && 'text-white bg-[#06A9EF] rounded-[6px]' }`} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_4135_57883)">
                  <path
                    d="M4.5 21C4.08333 21 3.72917 20.8542 3.4375 20.5625C3.14583 20.2708 3 19.9167 3 19.5V17.6L7 14.05V21H4.5ZM8 21V17H16V21H8ZM17 21V12.8L12.725 8.99999L15.75 6.32499L20.5 10.55C20.6667 10.7 20.7917 10.8708 20.875 11.0625C20.9583 11.2542 21 11.4583 21 11.675V19.5C21 19.9167 20.8542 20.2708 20.5625 20.5625C20.2708 20.8542 19.9167 21 19.5 21H17ZM3 16.25V11.675C3 11.4583 3.04167 11.25 3.125 11.05C3.20833 10.85 3.33333 10.6833 3.5 10.55L11 3.89999C11.1333 3.76666 11.2875 3.67083 11.4625 3.61249C11.6375 3.55416 11.8167 3.52499 12 3.52499C12.1833 3.52499 12.3625 3.55416 12.5375 3.61249C12.7125 3.67083 12.8667 3.76666 13 3.89999L15 5.67499L3 16.25Z"
                    fill={toggle === 0 ? "#FFF" : "#333"} 
                  />
                </g>
              </svg>
              <div onClick={() => setToggle(0)} className={`text-[14px] font-semibold flex items-center justify-center `}>
                Home
              </div>
            </div>
            <div className={`flex flex-row py-[8px] px-[16px] gap-[8px] items-center justify-center ${toggle === 1 && 'text-white bg-[#06A9EF] rounded-[6px]' }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16.667px"
                viewBox="0 0 20 18"
                fill="none"
              >
                <path
                  d="M18.3333 3.16667H14.1667V2.33331C14.1667 1.41413 13.4192 0.666626 12.5 0.666626H7.5C6.58082 0.666626 5.83332 1.41409 5.83332 2.33331V3.16663H1.66668C0.747461 3.16667 0 3.91413 0 4.83331V7.33331C0 8.25252 0.747461 8.99999 1.66668 8.99999H8.33336V8.58331C8.33336 8.35299 8.51973 8.16663 8.75004 8.16663H11.25C11.4804 8.16663 11.6667 8.35299 11.6667 8.58331V8.99999H18.3334C19.2525 8.99999 20 8.25252 20 7.33331V4.83331C20 3.91413 19.2525 3.16667 18.3333 3.16667ZM12.5 3.16667H7.5V2.33331H12.5V3.16667Z"
                  fill={toggle === 1 ? "#FFF" : "#333"} 
                />
                <path
                  d="M19.7689 9.44958C19.6269 9.37919 19.4572 9.39548 19.3318 9.49068C19.0356 9.7149 18.6905 9.83329 18.3333 9.83329H11.6667V11.0833C11.6667 11.3136 11.4803 11.5 11.25 11.5H8.75C8.51969 11.5 8.33332 11.3136 8.33332 11.0833V9.83329H1.66668C1.30941 9.83329 0.964375 9.7149 0.668125 9.49068C0.542383 9.39466 0.373125 9.37837 0.231094 9.44958C0.0895312 9.52001 0 9.66443 0 9.82275V15.6667C0 16.5858 0.747461 17.3333 1.66668 17.3333H18.3334C19.2525 17.3333 20 16.5859 20 15.6667V9.82275C20 9.66443 19.9105 9.52001 19.7689 9.44958Z"
                  fill={toggle === 1 ? "#FFF" : "#333"} 
                />
              </svg>
              <div onClick={() => setToggle(1)} className="text-[14px] font-[500] flex items-center justify-center">
                Applied Jobs
              </div>
            </div>
            <div className={`flex flex-row py-[8px] px-[16px] gap-[8px] items-center justify-center ${toggle === 2 && 'text-white bg-[#06A9EF] rounded-[6px]' }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.205px"
                height="20.571px"
                viewBox="0 0 16 22"
                fill="none"
              >
                <path
                  d="M13.9322 0.714294H2.70242C1.60925 0.714294 0.714844 1.6087 0.714844 2.70187V20.0435C0.714844 20.5155 0.988136 20.9627 1.4105 21.1615C1.8577 21.3603 2.3546 21.3106 2.72727 21.0124L2.75211 20.9876L8.31733 16.2919L13.8825 20.9876L13.9074 21.0124C14.131 21.1863 14.4043 21.2857 14.6776 21.2857C14.8515 21.2857 15.0502 21.236 15.2242 21.1367C15.6465 20.9379 15.9198 20.4907 15.9198 20.0186V2.70187C15.9198 1.6087 15.0254 0.714294 13.9322 0.714294Z"
                  fill={toggle === 2 ? "#FFF" : "#333"} 
                />
              </svg>
              <div onClick={() => setToggle(2)} className="text-[14px] font-[500] flex items-center justify-center">
                Saved Jobs
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggle === 0 &&
        <div className="customMargins">

          <div className="grid grid-cols-5 gap-[24px] mb-[49px]">

            <div class="col-span-4">

              <Job_card />

              <div className="flex  p-[16px]  mt-[24px] justify-between w-[100%] rounded-[12px] bg-cover bg-center " style={{ backgroundImage: 'url(/images/afterLoginHome/bg-linear.png)' }}  >
                <div className="flex w-[80%]">
                  <div className="flex flex-col items-start gap-[24px] align-self-stretch">
                    <p className="text-[#fff] max-w-[50%] text-[18px] font-[500]  leading-[28px]">
                      Use our frequently asked interview questions to receive personalized AI questions, responses, and feedback.
                    </p>
                    <button className=" flex py-[8px] px-[16px] justify-center items-center gap-[4px] rounded-[8px] border border-solid border-[#06A9EF] text-[16px] text-[#fff] font-[500]  ">
                      Get Started
                      <img className="w-[20px]" src="./images/afterLoginHome/arrow_forward.png" alt="" />
                    </button>
                  </div>
                </div>
                <div className="w-[20%]" >
                  <img className="w-[155px]" src="./images/afterLoginHome/Frame-que.png" alt="" />
                </div>
              </div>

              <Job_card />

              <div className="flex  p-[16px]  mt-[24px] justify-between w-[100%] rounded-[12px] bg-cover bg-center " style={{ backgroundImage: 'url(/images/afterLoginHome/elevate_back.png)' }}  >
                <div className="flex w-[80%]">
                  <div className="flex flex-col items-start gap-[24px] align-self-stretch">
                    <p className="text-[#333] max-w-[60%] text-[18px] font-[500]  leading-[28px]">
                      Elevate your day with our Daily Quiz. Quick, fun, and your daily dose of brainpower boost!
                    </p>
                    <button className=" flex py-[8px] px-[16px] justify-center items-center gap-[4px] rounded-[8px] border border-solid border-[#333] text-[16px] text-[#333] font-[500]  ">
                      Get Started
                      <img className="w-[20px]" src="./images/afterLoginHome/arrow_forward_black.png" alt="" />
                    </button>
                  </div>
                </div>
                <div className="w-[20%]" >
                  <img className="w-[155px]" src="./images/afterLoginHome/elevate_sec.png" alt="" />
                </div>
              </div>

              <Job_card />

              <div className="flex  p-[16px]  mt-[24px] justify-between w-[100%] rounded-[12px] bg-cover bg-center " style={{ backgroundImage: 'url(/images/afterLoginHome/uncover_back.png)' }}  >
                <div className="flex w-[80%]">
                  <div className="flex flex-col items-start gap-[24px] align-self-stretch">
                    <p className="text-[#fff] max-w-[50%] text-[18px] font-[500]  leading-[28px]">
                      Uncover Your Potential with Effortless Skill Assessment. Elevate Your Abilities, Elevate Your Success!         </p>
                    <button className=" flex py-[8px] px-[16px] justify-center items-center gap-[4px] rounded-[8px] border border-solid border-[#fff] text-[16px] text-[#fff] font-[500]  ">
                      Get Started
                      <img className="w-[20px]" src="./images/afterLoginHome/arrow_forward.png" alt="" />
                    </button>
                  </div>
                </div>
                <div className="w-[20%]" >
                  <img className="w-[155px]" src="./images/afterLoginHome/OBJECTS.png" alt="" />
                </div>
              </div>
            </div>


            <div class="col-span-1 ">
              <div className="flex flex-col gap-[24px] mt-[24px] items-start">
                <img src="images/afterLoginHome/skill_assesment.png" alt="" />
              </div>
              <div className="flex flex-col gap-[24px] mt-[24px] items-start">
                <img src="images/afterLoginHome/skill_assesment.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      }

      {toggle === 1 &&

        <AppliedJobs />


      }
      {toggle === 2 &&

        <SavedJobs />


      }

    </div>

  );
}

export default AfterLoginHome;