import React from "react";

function Resume6({ data }) {
  return (
 
    <>
      <div className="w-[800px] flex gap-10">
        <div>
          <div className=" w-[268px] flex ">
            <div className="bg-[#FFC20E] w-[46px]">
            </div>
            <div className="flex w-[200px] ml-[-3rem]  flex-col gap-16">
              <div className="w-[243px] flex flex-col  ">
                <div className="pt-[50px] pl-[70px]">
                  <div class="w-[116px] h-[116px]  flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full overflow-hidden">
                    {data.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(data.profilePhoto)}
                        alt=""
                      />
                    ) : (
                      <img src="/images/services/profile.png" alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[243px] justify-start items-start gap-6 pl-5">
                <div className="flex flex-col w-[166px]  gap-3">
                  <div className="flex gap-6 w-full">
                    <img
                      src="/images/services/c.png"
                      className="w-[16px] h-[16px]"
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className="font-[400] text-[11px]">Phone</p>
                      <p className="font-[400] text-[9px]">
                        {data.mobileNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <img
                      src="/images/services/m.png"
                      className="w-[16px] h-[16px]"
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className="font-[400] text-[11px]">Email</p>
                      <p className="font-[400] text-[9px]">{data.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <img
                      src="/images/services/w.png"
                      className="w-[16px] h-[16px]"
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className="font-[400] text-[11px]">Website</p>
                      <p className="font-[400] text-[9px]">{data.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <img
                      src="/images/services/l.png"
                      className="w-[16px] h-[16px]"
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className="font-[400] text-[11px]">Area</p>
                      <p className="font-[400] text-[9px]">{data.location}</p>
                    </div>
                  </div>
                 

                </div>
              </div>
            </div>
          </div>
          
          <div className="ml-6 pt-4">
          <div className="flex w-[166px] flex-col">
            <div className="flex items-start justify-start flex-col gap-3 ">
              <p className="text-[14px] font-[600]">SKILLS</p>
              <div className="gap-4 flex w-[166px] ">
                {data?.skills?.length > 0 && (
                  <div className="flex flex-col w-full items-start justify-start gap-3">
                    {data.skills.map((detail, index) => (
                      <div
                        key={index}
                        className="flex  items-center justify-center gap-2"
                      >
                        <div className="w-[48px]">
                          <p className="text-[10px] font-normal">
                            {detail.skill}
                          </p>
                        </div>
                        <div className=" bg-[#DCDDDE] h-[5px] w-[90px]">
                          <div
                            className="bg-[#333]"
                            style={{ width: "50px" }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-[1px] w-[166px] bg-[#282829]"></div>

          <div className="flex w-[166px] flex-col ">
            <div className="flex items-start justify-start flex-col gap-3 ">
              <p className="text-[14px] font-[600]">LANGAUGES</p>
              <div className="gap-4 flex w-[166px] ">
                {data?.languages?.length > 0 && (
                  <div className="flex flex-col w-full items-start justify-start gap-3">
                    {data.languages.map((detail, index) => (
                      <div
                        key={index}
                        className="flex  items-center justify-center "
                      >
                        <p className="text-[10px] font-normal">
                          {detail.languages}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-[1px] w-[166px] bg-[#282829]"></div>
        </div>
        </div>
        <div className="flex justify-around flex-col w-[443px]">
          <div className="w-[406px] ">
                <p className="text-[21px] font-[900]">{data.firstName}{" "}{data.lastName}</p>
                <span className="font-[500] text-[12px]">{data.designation}</span>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
}

export default Resume6;
