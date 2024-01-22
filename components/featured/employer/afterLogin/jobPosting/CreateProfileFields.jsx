import { Delete_icon, Edit_icon } from "@/utils/svg";
import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import JobDocument from "./JobDocument";
import ProfessionalDetails from "./ProfessionalDetails";
import Assessment from "./Assessment";
import { useRouter } from "next/router";

function CreateProfileFields() {
const router = useRouter()
  const [toggle, setToggle] = useState(0)
  const [successfull, setSuccessfull] = useState(false)
  return (
    <div
      className="w-full max-h-[80vh] overflow-y-auto py-[12px] flex flex-col gap-[12px] rounded-[12px] bg-[#fff] relative"
      style={{
        boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="w-full text-[18px] text-[#333] font-[500] px-[16px] text-start">
        Create Profile Required Fields
      </div>
      <div className=" bg-[#E0F6FF]  flex flex-col">
        <div
          className="bg-[#fff] m-4 flex flex-col justify-center py-[14px] gap-[8px] itmes-center rounded-[12px]"
          style={{
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="w-full flex justify-center ">
            <div className="flex w-[82.42%]  items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                  className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
                />
                <circle cx="12" cy="12" r="8" fill="#06A9EF" />
              </svg>
              <div className="h-[2px] w-full bg-[#C7C7C7]"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                  className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
                />
                <circle cx="12" cy="12" r="8" fill="#06A9EF" />
              </svg>
              <div className="h-[2px] w-full bg-[#C7C7C7]"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                  className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
                />
                <circle cx="12" cy="12" r="8" fill="#06A9EF" />
              </svg>
              <div className="h-[2px] w-full bg-[#C7C7C7]"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#C7C7C7"
                  className="h-[24px] w-[24px] ms:h-[64px] ms:w-[64px]"
                />
                <circle cx="12" cy="12" r="8" fill="#06A9EF" />
              </svg>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="flex justify-between gap-[8px] w-[90.42%]">
              <div className="text-[#333] text-[10px] ml:text-[16px] font-[500]">
                Personal details
              </div>
              <div className="text-[#333] text-[10px] ml:text-[16px] font-[500]">
                Documents
              </div>
              <div className="text-[#333] text-[10px] ml:text-[16px] font-[500]">
                Professional details
              </div>
              <div className="text-[#333] text-[10px] ml:text-[16px] font-[500]">
                Assessment
              </div>
            </div>
          </div>
        </div>


        {toggle == 0 &&
          <PersonalDetails setToggle={setToggle} />
        }
        {toggle == 1 &&
          <JobDocument setToggle={setToggle} />
        }
        {toggle == 2 &&
          <ProfessionalDetails setToggle={setToggle} />
        }

        {toggle == 3 &&
          <Assessment setSuccessfull={setSuccessfull} />
        }

        {successfull &&
          <>

            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">

              <div
                className="w-[330px] rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="text-center">
                  <div className="text-[24px] font-[500] text-[#333]">
                    Job Posted Successfully!
                  </div>
                  <div className="text-[16px] font-[500] text-[#333]">
                    you can view your Post in Hiring page.
                  </div>
                </div>
                <div className="flex justify-center">
                  <button onClick={()=>router.push("/employer/afterLogin/Hiring")} className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]">Go to Hiring</button>
                </div>
              </div>
            </div>
          </>
        }
      </div>

    </div>

  );
}

export default CreateProfileFields;