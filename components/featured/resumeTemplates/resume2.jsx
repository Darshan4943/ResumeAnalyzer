import React from "react";

function Resume2({ data }) {
  return (
    <>
      <div className="flex  w-[800px]  break-all">
        <div className=" pt-[16px] w-[490px] h-full min-h-[1131px] pl-[16px]">
          <div className="flex items-start flex-col gap-[16px]">
            <div className="relative ml-[10px]">
              {data.profilePhoto ? (
                <img src={URL.createObjectURL(data.profilePhoto)} alt="" className="w-[200px] relative h-[200px] rounded-full z-20" />
              ) : (
                <img src="/images/services/profile.png" alt="" className="w-[200px] relative z-20 h-[200px] rounded-3xl" />
              )}
              <div className="absolute top-[35%] left-[95%] z-10 ">
                <svg xmlns="http://www.w3.org/2000/svg" width={584} viewBox="0 0 401 33" fill="none">
                  <path d="M401 0H0V33H401V0Z" fill="#F7902B" />
                  <text x="7%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="22" fontWeight={600}>{data.firstName} {" "} {data.lastName} </text>
                </svg>

              </div >
              <div className="absolute top-[35%] left-[150%]">
                <svg xmlns="http://www.w3.org/2000/svg" width={474} viewBox="0 0 311 48" fill="none">
                  <path d="M311 48H20.1135L0 0H311V48Z" fill="#B3691B" />
                  <text x="10%" y="85%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="10" fontWeight={600}>{data.designation} </text>
                </svg>
              </div>

            </div>


            <div className="flex flex-col w-[100%]">
              <div className="flex flex-col gap-3 w-[100%]">
                <p className="text-[#676669] text-[20px] font-[600] pt-[13px] font-barlow-condensed leading-normal">
                  ABOUT ME
                </p>
                <div className="w-[85%] bg-[#F7902B] h-[3px]"></div>
                <p className=" text-[#272128] font-[500] font-barlow  text-[12px] max-w-[80%]">
                  {data.summery}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-[100%] mt-4">
                <p className="text-[#3C3A40] text-[20px] font-[600] pt-[13px] font-barlow-condensed leading-normal">
                  EDUCATION
                </p>
                <div className="w-[85%] bg-[#F7902B] h-[3px]"></div>
                {data?.education?.map((detail, index) => (
                  <div>
                    <p className=" text-[#272128] font-semibold font-barlow text-[12px] max-w-[80%]">
                      {detail.qualification}
                    </p>
                    <p className=" text-[#272128] font-medium font-barlow  text-[12px] max-w-[80%]">
                      {detail.specialization}
                    </p>
                    <p className=" text-[#272128] font-normal font-barlow  text-[12px] max-w-[80%]">
                      {detail.instituteName}
                    </p>

                    <p className=" text-[#272128] font-[300] font-barlow  text-[12px] max-w-[80%]">
                      {detail.duration?.end?.year &&
                        <>
                          {detail.duration?.start?.year}-
                          {detail.duration?.end?.year}
                        </>
                      }
                    </p>
                  </div>
                ))}
              </div>



              <div className="flex flex-col gap-3 w-[100%] mt-8">
                <p className="text-[#3C3A40] text-[20px] font-[600]  font-barlow-condensed leading-normal">
                  EXPERIENCE
                </p>
                <div className="w-[85%] bg-[#F7902B] h-[3px]"></div>
                {data?.experience?.map((detail, index) => (
                  <div>
                    <p className=" text-[#272128] font-[600] font-barlow  text-[12px] max-w-[80%]">
                      {detail.organization}
                    </p>
                    <p className=" text-[#272128] font-[500] font-barlow  text-[12px] max-w-[80%]">
                      {detail.designation}
                    </p>
                    <p className=" text-[#272128] font-[300] font-barlow  text-[12px] max-w-[80%]">
                      {detail.description}
                    </p>
                    <p className=" text-[#272128] font-[300] font-barlow  text-[12px] max-w-[80%]">
                    {detail.duration?.start?.year}-{" "}
                                            {detail.currentlyWorking
                                                ? "Present"
                                                : detail.duration?.end?.year}
                    </p>
                  </div>
                ))}
              </div>
              {data?.languages?.length > 0 && (
                <div className="flex flex-col gap-3 w-[100%] mt-8">
                  <p className="text-[#3C3A40] text-[20px] font-[600]  font-barlow-condensed leading-normal">
                    Languages
                  </p>
                  <div className="w-[85%] bg-[#F7902B] h-[3px]"></div>
                  {data?.languages?.map((detail, index) => (
                    <div>
                      <p className=" text-[#272128] font-[500] font-barlow  text-[12px] max-w-[80%]">
                        {detail.languages}
                      </p>


                    </div>
                  ))}
                </div>
              )}
              <div className="w-[495px]  ml-[-16px] mt-8 h-[42px] bg-[#F7902B]"></div>
            </div>
          </div>
        </div>

        <div className=" bg-[#2C2A31] w-[310px] pl-[16px] pb-4 ">
          <div className="flex flex-col gap-12 items-start mt-[200px] ">

            <div className="flex flex-col gap-3">
              <p className="text-[18px] text-[#fff] font-[600]  font-barlow-condensed leading-normal">
                Conatct Me{" "}
              </p>
              <div className="flex  gap-4 items-start">
                <div className="mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 13 17" fill="none" >
                    <path d="M6.90887 0.289062C3.60787 0.289062 0.921875 2.97441 0.921875 6.27684C0.921875 10.3744 6.27887 16.3892 6.50787 16.6432C6.72187 16.8822 7.09588 16.8812 7.30988 16.6432C7.53788 16.3892 12.8949 10.3744 12.8949 6.27684C12.8959 2.97541 10.2099 0.289062 6.90887 0.289062ZM6.90887 9.28923C5.24787 9.28923 3.89688 7.93806 3.89688 6.27684C3.89688 4.61563 5.24787 3.26446 6.90887 3.26446C8.56987 3.26446 9.92087 4.61563 9.92087 6.27684C9.92087 7.93806 8.56987 9.28923 6.90887 9.28923Z" fill="#F7902B" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#fff] text-[10px] font-[600] leading-normal">
                    Address
                  </p>
                  <p className="text-[#fff] text-[10px] font-[300]  leading-normal">
                    {data.location}
                  </p>

                </div>
              </div>

              <div className="flex pt-[10px] gap-4 items-start">
                <div className="mt-2">
                  <img
                    className="w-[16px] h-[17px]"
                    src="/images/services/email_yellow.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#fff] text-[10px] font-[600] leading-normal">
                    Email
                  </p>
                  <p className="text-[#fff] text-[10px] font-[300] leading-normal">
                    {data.email}
                  </p>
                </div>
              </div>

              <div className="flex pt-[10px] gap-4 items-start">
                <div className="mt-2">
                  <img
                    className="w-[16px] h-[17px]"
                    src="/images/services/phone_yellow.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#fff] text-[10px] font-[600] leading-normal">
                    Phone
                  </p>
                  <p className="text-[#fff] text-[10px] font-[300] leading-normal">
                    {data.mobileNumber}
                  </p>
                </div>
              </div>
            </div>
            {data?.skills?.length > 0 && (
              <>
                <div className="h-[1px] bg-[#fff]  w-[100%]"></div>
                <div className="flex flex-col gap-8">
                  <p className="text-[18px] text-[#fff] font-[600]  font-barlow-condensed leading-normal">
                    Skills
                  </p>
                  {/* {data?.skills?.map((detail, index) => (
                <div className="flex ">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="32"
                      viewBox="0 0 31 32"
                      fill="none"
                    >
                      <path
                        d="M0.529297 31.1166C0.529297 21.0683 0.529297 11.021 0.529297 0.972656C10.5763 0.972656 20.6223 0.972656 30.6693 0.972656C30.6693 11.014 30.6693 21.0553 30.6693 31.1166C20.5953 31.1166 10.5623 31.1166 0.529297 31.1166ZM2.3063 29.3304C11.1833 29.3304 20.0353 29.3304 28.8803 29.3304C28.8803 20.4552 28.8803 11.6011 28.8803 2.75292C20.0113 2.75292 11.1653 2.75292 2.3063 2.75292C2.3063 11.6161 2.3063 20.4622 2.3063 29.3304Z"
                        fill="#F7902B"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2 ml-[-1.5px] ">
                    <p className="text-[11px] font-[300] text-[#fff] leading-tight ml-[5px] mt-[-12px]">
                      {detail.skill}
                    </p>
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="162"
                        height="13"
                        viewBox="0 0 162 13"
                        fill="none"
                      >
                        <path
                          d="M1.66992 6.17383H160.218"
                          stroke="#F7902B"
                          stroke-width="3"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />

                      </svg>
                      <div className="absolute top-[-10%]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="162" height="13" viewBox="0 0 162 13" fill="none" >

                          <path d="M142.66 12.4647C145.862 12.4647 148.457 9.86891 148.457 6.66689C148.457 3.46488 145.862 0.869141 142.66 0.869141C139.459 0.869141 136.863 3.46488 136.863 6.66689C136.863 9.86891 139.459 12.4647 142.66 12.4647Z" fill="white" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>
              ))} */}

                  {data.skills?.map((detail, index) => {
                    const calculateWidthPercentage = (rating) => {
                      let ratingPercentage = 0;
                      if (rating && rating.length > 0) {
                        const zerosCount = rating.filter(val => val === 0).length;

                        if (zerosCount === 0) ratingPercentage = 0;
                        else if (zerosCount === 1) ratingPercentage = 10;
                        else if (zerosCount === 2) ratingPercentage = 30;
                        else if (zerosCount === 3) ratingPercentage = 50;
                        else if (zerosCount === 4) ratingPercentage = 70;
                      }
                      return ratingPercentage;
                    };

                    const ratingPercentage = calculateWidthPercentage(detail.rating);

                    return (
                      <div className="flex ">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="32"
                            viewBox="0 0 31 32"
                            fill="none"
                          >
                            <path
                              d="M0.529297 31.1166C0.529297 21.0683 0.529297 11.021 0.529297 0.972656C10.5763 0.972656 20.6223 0.972656 30.6693 0.972656C30.6693 11.014 30.6693 21.0553 30.6693 31.1166C20.5953 31.1166 10.5623 31.1166 0.529297 31.1166ZM2.3063 29.3304C11.1833 29.3304 20.0353 29.3304 28.8803 29.3304C28.8803 20.4552 28.8803 11.6011 28.8803 2.75292C20.0113 2.75292 11.1653 2.75292 2.3063 2.75292C2.3063 11.6161 2.3063 20.4622 2.3063 29.3304Z"
                              fill="#F7902B"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-2 ml-[-1.5px] ">
                          <p className="text-[11px] font-[300] text-[#fff] leading-tight ml-[5px] mt-[-12px]">
                            {detail.skill}
                          </p>
                          <div className="relative">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="162"
                              height="13"
                              viewBox="0 0 162 13"
                              fill="none"
                            >
                              <path
                                d="M1.66992 6.17383H160.218"
                                stroke="#F7902B"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                              />

                            </svg>
                            <div className={`absolute top-[-10%] `} style={{ left: `${-ratingPercentage}%` }}   >
                              <svg xmlns="http://www.w3.org/2000/svg" width="162" height="13" viewBox="0 0 162 13" fill="none" >

                                <path d="M142.66 12.4647C145.862 12.4647 148.457 9.86891 148.457 6.66689C148.457 3.46488 145.862 0.869141 142.66 0.869141C139.459 0.869141 136.863 3.46488 136.863 6.66689C136.863 9.86891 139.459 12.4647 142.66 12.4647Z" fill="white" />
                              </svg>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume2;
