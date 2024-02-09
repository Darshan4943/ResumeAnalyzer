import React from "react";
import Languages from "../candidate/createResume/components/languages";

const Resume12 = ({ data }) => {
  console.log(4, data.experience);

  return (
    <>
      <div className="flex gap-12 justify-start items-center flex-col w-[794px] min-h-[1122px]">
        <div className="w-full h-[236px] ">
          <div className="bg-[#0C2438] h-full relative">
            <div className="absolute bottom-0 w-[582px] h-[100px] bg-[#2EA0D7]">
              <div className="flex flex-col pl-[80px]">
                <p className="text-[38px] font-[400] text-[#fff] font-Lato">
                  {data.firstName} {data.lastName}
                </p>
                <p className="text-[16px] font-[400] text-[#fff] font-Lato">
                  {data.designation}
                </p>
              </div>
            </div>

            <div className="absolute right-[58px] bottom-[-26px]">
              {data.profilePhoto ? (
                <img
                  src={URL.createObjectURL(data.profilePhoto)}
                  alt=""
                  className="w-[200px] relative h-[200px] rounded-full z-20"
                />
              ) : (
                <img
                  src="/images/services/profile.png"
                  alt=""
                  className="w-[208px] relative z-20 h-[208px] rounded-3xl"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[88.41%] gap-8">
          <div className="w-full flex flex-col gap-4">
            <p className="font-[700px] text-[18px] text-[#495970] font-Lato">
              CONTACTS
            </p>
            <div className="w-[90.62%] flex gap-8 ">
              <div className="flex flex-col items-start justify-start gap-2 w-[18.72%] max-w-[130px]">
                <p className="text-[14px] font-[700] text-[#495970]">PHONE</p>
                <p className="text-[14px] font-[400] text-[#8B8C8C]">
                  {data.mobileNumber}
                </p>
              </div>
              <div className="bg-[#B5BCC5]  w-[1px] h-[50px]"></div>
              <div className="w-auto max-w-[200px] gap-2 flex flex-col">
                <p className="text-[14px] font-[700] text-[#495970] font-Lato">
                  EMAIL
                </p>
                <p className="text-[14px] font-[400] text-[#8B8C8C] font-Lato">
                  {data.email}
                </p>
              </div>
              <div className="bg-[#B5BCC5]  w-[1px] h-[50px]"></div>
              <div className="max-w-[225px] w-auto gap-2 flex flex-col">
                <p className="text-[14px] font-[700] text-[#495970] font-Lato">
                  ADDRESS
                </p>
                <p className="text-[14px] font-[400] text-[#8B8C8C] font-Lato break-all">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="gap-6 flex items-center">
              <p className="text-[18px] font-[700] font-Lato text-[#495970]">
                EDUCATION
              </p>
              <div className="bg-[#B5BCC5] w-[572px] h-[1px]"></div>
            </div>

            <div className="grid grid-cols-2 w-full gap-7">
              {data?.education?.map((detail, index) => (
                <>
                  <div className="flex flex-col gap-2 w-[337px] ">
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2  ">
                        {detail.duration?.end?.year && (
                          <>
                            <p className="font-[700] text-[14px] font-Lato text-[#495970]">
                              {detail.duration?.start?.year}
                            </p>
                            <p className="font-[700] text-[14px] font-Lato text-[#495970]">
                              {" "}
                              {detail.duration?.end?.year}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="bg-[#B5BCC5] h-auto w-[1px]"></div>
                      <div className="flex flex-col gap-2 w-full break-all">
                        <p className="font-[400] text-[12px] font-Lato text-[#495970]">
                          {detail.instituteName}
                        </p>
                        <p className="font-[700] text-[14px] font-Lato text-[#495970]">
                          {detail.qualification}
                        </p>
                      </div>
                    </div>
                    <p className="font-[400] text-[12px] font-Lato text-[#676A6D] w-full break-all ">
                      {" "}
                      {detail.specialization}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* EXPERIENCE  */}
          <div className="flex flex-col gap-4 w-full">
            <div className="gap-6 flex items-center">
              <p className="text-[18px] font-[700] font-Lato text-[#495970]">
                EXPERIENCES
              </p>
              <div className="bg-[#B5BCC5] w-[572px] h-[1px]"></div>
            </div>
            <div className="grid grid-cols-2 w-full gap-7">
              {data?.experience?.map((detail, index) => (
                <>
                  <div className="flex flex-col gap-[6px] w-full">
                    <p className="font-[400] text-[12px] font-Lato text-[#495970]">
                      {detail.duration?.start?.year}-{" "}
                      {detail.currentlyWorking
                        ? "Present"
                        : detail.duration?.end?.year}
                    </p>
                    <p className="font-[700] text-[12px] font-Lato text-[#495970]">
                      {detail.designation}
                    </p>
                    <div className="flex w-[33p7x] gap-1">
                      <p className="font-[400] text-[12px] font-Lato text-[#495970] max-w-[180px]">
                        {" "}
                        {detail.organization}
                      </p>
                      <div className="h-full w-[1px] bg-[#495970]"></div>
                      <p className="font-[400] text-[12px] font-Lato text-[#495970]">
                        {" "}
                        {detail.location}
                      </p>
                    </div>
                    <p className="w-[337px] font-Lato text-[12px] font-[400] text-[#676A6D]">
                      {" "}
                      {detail.description}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* SKILLS   */}

          <div className="flex flex-col w-full">
            <div className="gap-6 flex items-center">
              <p className="text-[18px] font-[700] font-Lato text-[#495970]">
                SKILLS
              </p>
              <div className="bg-[#B5BCC5] w-full h-[1px]"></div>
            </div>
            <div className="grid grid-cols-2 w-full gap-2 pt-4">
              {data.skills?.map((detail, index) => {
                const calculateWidthPercentage = (rating) => {
                  let ratingPercentage = 0;
                  if (rating && rating.length > 0) {
                    const zerosCount = rating.filter((val) => val === 0).length;

                    if (zerosCount === 0) ratingPercentage = 100;
                    else if (zerosCount === 1) ratingPercentage = 80;
                    else if (zerosCount === 2) ratingPercentage = 60;
                    else if (zerosCount === 3) ratingPercentage = 40;
                    else if (zerosCount === 4) ratingPercentage = 20;
                  }
                  return ratingPercentage;
                };

                const ratingPercentage = calculateWidthPercentage(
                  detail.rating
                );

                return (
                  <div className="flex flex-col" key={index}>
                    <div className=" flex items-center gap-2 w-[270px] ">
                      <p className="text-[#545554] font-Lato text-[12px] w-[160px] font-light">
                        {detail.skill}
                      </p>
                      <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#DCDDDE]">
                        <div
                          className="h-full bg-[#2EA0D7]"
                          style={{ width: `${ratingPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* INTEREST  */}

          <div className="flex flex-col w-full pb-2">
            <div className="gap-6 flex items-center">
              <p className="text-[18px] font-[700] font-Lato text-[#495970]">
                INTERESTS
              </p>
              <div className="bg-[#B5BCC5] w-full h-[1px]"></div>
            </div>
            <div className="grid row-span-1  ">
              <div className="grid grid-cols-4 list-disc">
                {data.hobbies?.map((detail, index) => (
                  <li class="bg-blue-500 text-black p-1 rounded-full font-Lato">
                    {detail.title}
                  </li>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full pb-4">
            <div className="gap-6 flex items-center">
              <p className="text-[18px] font-[700] font-Lato text-[#495970]">
                LANGUAGES
              </p>
              <div className="bg-[#B5BCC5] w-full h-[1px]"></div>
            </div>
            <div className="flex gap-1 pt-2">
              {data?.languages?.map((detail, index) => (
                <div>
                  <p className=" text-[#545554] font-[400]  text-[14px] font-Lato ">
                    {detail.languages} {","}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume12;
