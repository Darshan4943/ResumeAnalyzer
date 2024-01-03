import React from "react";

function Resume5({
  formData,
  aboutData,
  educationData,
  experienceData,
  skills,
  languages,
  socialData,
  data,
}) {
  return (
    <div className="flex  border border-[#06A9EF] rounded-[9px] w-[595px] break-all ">
      <div className="w-[233px]  ">
        <div className="pt-[33.72px] pl-[27.74px] pr-[21.15px]">
          <div className="w=[183.71px] h-[235.24px] ">
            {data.profilePhoto ? (
              <img src={URL.createObjectURL(data.profilePhoto)} alt="" />
            ) : (
              <img src="/images/services/black.png" alt="" />
            )}
          </div>
        </div>
        <div className="pt-[39.93px]">
          <div className="w-[235.577px] h=[29.196px] bg-[#316059] flex justify-center ">
            <p className="text-[#F9F9F9] font-kanit text-base font-normal">
              CONTACT
            </p>
          </div>
        </div>

        <div className="pt-[25.45px] pl-[28.13px] flex flex-col gap-2">
          <div className="flex justify-start items-center gap-[8.46px]">
            <div className="w-[14.8px] h-[14.8px]">
              <img src="/images/services/cg.png" alt="" />
            </div>
            <p className="text-[#414142] font-kanit text-[11.136px] font-light">
              {data.mobileNumber}
            </p>
          </div>
          <div className="flex justify-start items-center gap-[8.46px]">
            <div className="w-[14.8px] h-[14.8px]">
              <img src="/images/services/mg.png" alt="" />
            </div>
            <p className="text-[#414142] font-kanit text-[11.136px] font-light leading-normal">
              {data.email}
            </p>
          </div>
          {data.sociaLinks.map((detail, index) => (
            <div className="flex justify-start items-center gap-[8.46px]">
              <div className="w-[14.8px] h-[14.8px]">
                <img src="/images/services/wg.png" alt="" />
              </div>
              <p className="text-[#414142] font-kanit text-[11.136px] font-light">
                {detail.link}
              </p>
            </div>
          ))}
          <div className="flex justify-start items-center gap-[8.46px]">
            <div className="w-[14.8px] h-[14.8px]">
              <img src="/images/services/lg.png" alt="" />
            </div>
            <p className="text-[#414142] font-kanit text-[11.136px] font-light">
              {data.location}
            </p>
          </div>
        </div>

        <div className="pt-[39.93px]">
          <div className="w-[235.577px] h=[29.196px] bg-[#316059] flex justify-center ">
            <p className="text-[#F9F9F9] font-kanit text-base font-normal">
              SKILLS
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-6">
          {data.skills.map((detail, index) => (
            <div className="pl-[28.13px] pr-3 flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[#414142] font-kanit text-[11.136px] w-[80px] font-light">
                  {detail.skill}
                </p>
                <div className="w-[59.21%] h-[3.78px] bg-[#C1C1C1]">
                  <div className={`w-[80.21%] h-[3.78px] bg-[#316059]`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-[32.93px]">
          <div className="w-[235.577px] h=[29.196px] bg-[#316059] flex justify-center ">
            <p className="text-[#F9F9F9] font-kanit text-base font-normal">
              LANGUAGES
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-6">
          {data.languages.map((detail, index) => (
            <div className=" pl-[28.13px] pr-3 flex flex-col gap-1 ">
              <div className="flex justify-between items-center gap-4">
                <p className="text-[#414142] font-kanit text-[11.136px]  w-[80px] font-light">
                  {detail.languages}
                </p>
                <div className="w-[59.21%] h-[3.78px] bg-[#C1C1C1]  rounded-full ">
                  <div className="w-[80.21%] h-[3.78px] bg-[#316059]  rounded-full "></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col  w-[362px] ">
        <div className="flex justify-end items-center">
          <div className="w-[27.74px] h-[27.74px] bg-[#316059] rounded-tr-[8px]"></div>
        </div>
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-col items-start pt-[25px]  ">
            <p className="text-[#2B2A2A] font-kanit text-[26.333px] font-semibold leading-normal">
              {data.firstName} {data.lastName}
            </p>
            <p className="font-kanit text-[18.96px] text-[#316059] text-lg font-normal">
              {data.designation}
            </p>
          </div>
          <div className="rounded-tl-xl px-[39.15px] rounded-br-[8px] bg-[#316059] h-[700px] ">
            {data.showSummary && (
              <>
                <div className="pt-[27.5px] w-[283px] ">
                  <p className="text-[rgb(249,249,249)] font-Kanit text-base font-normal">
                    About Me
                  </p>
                </div>
                <div className=" pt-[18px] ">
                  <div className="flex gap-2">
                    <div className="w-[4.4px] h-[4.4px] flex items-center justify-center pt-[8px]">
                      <img src="/images/services/rect.png" alt="" />
                    </div>
                    <p className="text-[#F9F9F9] font-Kanit text-[11px] font-[300px] ">
                      {data.summery}
                    </p>
                  </div>
                </div>
                <div className="pt-[23px] pl-[50px]">
                  <div className="w-[150px] h-[0.465px] bg-[#F9F9F9]"></div>
                </div>
              </>
            )}
            {data.showEducation && (
              <>
                <div className=" pt-[20.65px] ">
                  <p className="text-[rgb(249,249,249)] font-Kanit text-base font-normal">
                    EDUCATION
                  </p>
                </div>
                <div className=" pt-[16px]">
                  <div className="flex gap-2 flex-col items-start  ">
                    {data.education.map((detail, index) => (
                      <div className="flex gap-2  ">
                        <div className="w-[4.4px] h-[4.4px] pt-[6px] flex items-center justify-center ">
                          <img src="/images/services/rect.png" alt="" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#F9F9F9] font-Kanit text-[11px] font-normal">
                            {detail.qualification} | {detail.specialization}
                          </p>
                          <p className="text-[#F9F9F9] font-Kanit text-[9px] font-light">
                            {detail.instituteName}
                          </p>
                          <p className="text-[#F9F9F9] font-Kanit text-[7px] font-light">
                            {detail.duration.start.year}-
                            {detail.duration.end.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-[23px] pl-[50px]">
                  <div className="w-[150px] h-[0.465px] bg-[#F9F9F9]"></div>
                </div>
              </>
            )}
            {data.showExperience && (
              <>
                {" "}
                <div className="pt-[20.65px]">
                  <p className="text-[rgb(249,249,249)] font-Kanit text-base font-normal">
                    EXPERIENCE
                  </p>
                </div>
                <div className=" pt-[16px]">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {data.experience.map((detail, index) => (
                      <div className="flex  gap-2 w-full ">
                        <div className="w-[8.4px] h-[8.4px] pt-[6px] flex items-center justify-center ">
                          <img src="/images/services/rect.png" alt="" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#F9F9F9] font-Kanit text-[12px] font-normal">
                            {detail.designation} | {detail.duration.start.year}-{" "}
                            {detail.currentlyWorking
                              ? "Present"
                              : detail.duration.end.year}
                          </p>

                          <p className="text-[#F9F9F9] font-Kanit text-[10px] font-light">
                            {detail.organization}
                          </p>
                          <p className="text-[#F9F9F9] font-Kanit text-[10px] font-light">
                            {detail.location}
                          </p>
                          <p className="text-[#F9F9F9] font-Kanit text-[9px] font-light pt-[5.68px]">
                            {detail.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-[23px] pl-[50px]">
                  <div className="w-[150px] h-[0.465px] bg-[#F9F9F9]"></div>
                </div>
              </>
            )}

            <div className="pt-[20.65px]">
              <p className="text-[rgb(249,249,249)] font-Kanit text-base font-normal">
                Courses
              </p>
            </div>
            <div className=" pt-[16px]">
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {data.course.map((detail, index) => (
                  <div className="flex  gap-2 w-full ">
                    <div className="w-[8.4px] h-[8.4px] pt-[6px] flex items-center justify-center ">
                      <img src="/images/services/rect.png" alt="" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#F9F9F9] font-Kanit text-[12px] font-normal">
                        {detail.courseName} | {detail.duration.start.year}-{" "}
                        {detail.duration.end.year}
                      </p>
                      <p className="text-[#F9F9F9] font-Kanit text-[10px] font-light">
                        {detail.issuedBy}
                      </p>
                      <p className="text-[#F9F9F9] font-Kanit text-[9px] font-light pt-[5.68px]">
                        {detail.discription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume5;
