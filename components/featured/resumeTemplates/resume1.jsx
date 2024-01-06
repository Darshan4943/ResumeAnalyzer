import React from "react";

const resume1 = ({ data }) => {
  return (
    <div class="resume_file_container">
      <div className="grid grid-cols-2">
        <div className="grid grid-flow-row gap-10">
          <div className="flex justify-center items-center ">
            <div className="w-[65%]">
              {data.profilePhoto ? (
                <img
                  src={URL.createObjectURL(data.profilePhoto)}
                  alt=""
                  className=""
                />
              ) : (
                <img src="/images/services/black.png" alt="" />
              )}
            </div>
          </div>
          <div className=" bg-[#316059] flex items-center justify-center h-fit ">
            <div className="flex justify-center items-center h-fit ">
              <p className="text-[#F9F9F9] font-kanit text-base flex items-center justify-center font-normal text-[14px]">
                CONTACTS
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="grid grid-flow-row gap-2  w-[116px] ">
              <div className="flex justify-end items-end ">
                <img src="/images/services/cg.png" alt="" />
              </div>
              <div className="flex justify-end items-end">
                <img src="/images/services/mg.png" alt="" />
              </div>
              {/* <div className="flex justify-end items-end">
          <img src="/images/services/wg.png" alt=""  />
          </div> */}
              <div className="flex justify-end items-end">
                <img src="/images/services/lg.png" alt="" />
              </div>
            </div>
            <div className="grid grid-flow-row gap-2 ">
              <div className="flex justify-start items-start">
                <p className="text-[#414142] font-kanit text-[11.136px] font-light">
                  {data.mobileNumber}
                </p>
              </div>
              <div className="flex justify-start items-start">
                <p className="text-[#414142] font-kanit text-[11.136px] font-light ">
                  {data.email}
                </p>
              </div>

              {/* {data?.sociaLinks?.map((detail, index) => (
          <div className="flex justify-start items-center gap-[8.46px]">
            <p className="text-[#414142] font-kanit text-[11.136px] font-light">
              {detail.link}
            </p>
          </div>
        ))} */}
              <div className="flex justify-start items-start">
                <p className="text-[#414142] font-kanit text-[11.136px] font-light">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
          <div className=" bg-[#316059]  h-[30px] ">
            <div className="flex justify-center items-center h-full">
              <p className="text-[#F9F9F9] font-kanit text-base font-normal text-[14px]">
                SKILLS
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="grid grid-flow-row gap-2  w-[116px] ">
              <div className="flex justify-end items-end ">
                <img src="/images/services/cg.png" alt="" />
              </div>
              <div className="flex justify-end items-end">
                <img src="/images/services/mg.png" alt="" />
              </div>
              {/* <div className="flex justify-end items-end">
          <img src="/images/services/wg.png" alt=""  />
          </div> */}
              <div className="flex justify-end items-end">
                <img src="/images/services/lg.png" alt="" />
              </div>
            </div>
            <div className="grid grid-flow-row gap-2 ">
              <div className="flex justify-start items-start">
                <p className="text-[#414142] font-kanit text-[11.136px] font-light">
                  {data.mobileNumber}
                </p>
              </div>
              <div className="flex justify-start items-start">
                <p className="text-[#414142] font-kanit text-[11.136px] font-light ">
                  {data.email}
                </p>
              </div>

              {/* {data?.sociaLinks?.map((detail, index) => (
          <div className="flex justify-start items-center gap-[8.46px]">
            <p className="text-[#414142] font-kanit text-[11.136px] font-light">
              {detail.link}
            </p>
          </div>
        ))} */}
              <div className="flex justify-start items-start">
                <p className="text-[#414142] font-kanit text-[11.136px] font-light">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grid ">
        Hi
      </div> */}
      </div>
    </div>
  );
};

export default resume1;
