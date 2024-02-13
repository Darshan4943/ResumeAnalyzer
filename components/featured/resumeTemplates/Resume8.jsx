import React from "react";

function Resume8({ data }) {
  return (
    <div className="h-[1122px] w-[794px] px-[42px] pt-[36px] pb-[55px] flex flex-col gap-[24px] ">
      <div className="flex w-full gap-[32px]">
        <div className="w-full flex flex-col gap-[20px] items-center">
          <div className="text-[48px] text-start w-full font-[400] font-inter">
            {data.firstName} <br /> {data.lastName}
          </div>
          <div class="w-[215.8px] h-[216px] flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full overflow-hidden ">
            {data.profilePhoto ? (
              <img src={URL.createObjectURL(data.profilePhoto)} alt="" />
            ) : (
              <img src="/images/services/profile.png" alt="" />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[48px]">
          <div className="flex justify-end">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.6406 44.4785V0.478516H0.640625C0.640625 24.7799 20.3393 44.4785 44.6406 44.4785Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-[36px]">
            <div className="border-y-[1px] border-solid border-[#000000] py-[8px] pl-[14px] text-[14px] font-[400] font-inter">
              EDUCATION
            </div>
            <div className="flex flex-col gap-[32px]">
              {data?.education?.map((detail, index) => (
                <div className="flex">
                  <div className="border-r-[1px] flex border-solid border-[#000000] py-[5.5px] pr-[10px] text-[20px] font-[700] text-[#000000]">
                    {detail.duration?.start?.year}-{detail.duration?.end?.year}
                  </div>
                  <div className="flex flex-col pl-[10px] gap-[4px] ">
                    <div className="text-[14px] font-[600]">
                      {detail.qualification}
                    </div>
                    {/* <div className="text-[10px] font-[600]">
                      {detail.specialization}
                    </div> */}
                    <div className="text-[12px] font-[600]">
                      {detail.instituteName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[36px]">
        <div className="w-[41.96%] flex flex-col gap-[26px]">
          <div>
            <div className="border-t-[1px] border-solid border-[#000000] py-[8px] pl-[14px] txet-[14px] font-[400]">
              CONTACT
            </div>
            <div className="flex border-t-[1px] border-solid border-[#000000] h-[32px]">
              <div className="w-[94.02px] flex items-center justify-center border-r-[1px] h-full border-solid border-[#000000] ">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5154 16.1094L17.8824 17.7425C17.27 18.33 16.4784 18.661 15.637 18.661C15.1777 18.661 14.7184 18.5589 14.3102 18.3548C11.7835 17.1301 9.46093 15.4709 7.49689 13.4807C5.50668 11.4905 3.84751 9.19407 2.62277 6.66737C2.06142 5.46749 2.29041 4.03864 3.23514 3.09522L4.8943 1.46221C4.99637 1.36014 5.09843 1.33398 5.20049 1.33398C5.32741 1.33398 5.45565 1.36014 5.53285 1.46221L9.43738 5.36675C9.53944 5.44264 9.56431 5.57087 9.56431 5.6991C9.56431 5.80117 9.53944 5.9281 9.43738 6.0053L7.88028 7.58725C8.51882 8.7361 9.33532 9.7816 10.2539 10.7263C11.1986 11.6449 12.2441 12.4614 13.3929 13.0999L14.95 11.5428C15.128 11.3636 15.4355 11.3636 15.6135 11.5428L19.518 15.4474C19.518 15.4474 19.518 15.4474 19.5442 15.4474C19.6946 15.6502 19.6946 15.9315 19.5154 16.1094Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="pl-[18.42px] text-[12px] font-[500] flex items-center">
                {data.mobileNumber}
              </div>
            </div>
            <div className="flex border-t-[1px] border-solid border-[#000000] h-[32px]">
              <div className="w-[94.02px] flex items-center justify-center border-r-[1px] h-full border-solid border-[#000000] ">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5745 2.66797H5.39943C3.68855 2.66797 2.32031 4.03624 2.32031 5.74712V14.574C2.32031 16.2848 3.68855 17.6531 5.39943 17.6531H16.5745C18.2854 17.6531 19.6536 16.2848 19.6536 14.574V5.74712C19.6536 4.03624 18.2854 2.66797 16.5745 2.66797ZM17.5557 7.75383C17.5557 7.75383 17.5323 7.75385 17.5101 7.77724V7.75383L12.2418 10.7183C11.4664 11.1522 10.5087 11.1522 9.73335 10.7183L4.44166 7.75383C4.0768 7.59362 3.89437 7.16093 4.05341 6.79606C4.21362 6.40781 4.64631 6.24877 5.01118 6.40781C5.08017 6.4312 5.12578 6.45344 5.17139 6.47683L10.4397 9.41912C10.7823 9.62494 11.1928 9.62494 11.5343 9.41912L16.8026 6.47683C17.144 6.27101 17.6013 6.3856 17.8059 6.72708C18.0118 7.06972 17.8972 7.52579 17.5557 7.75383Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="pl-[18.42px] text-[12px] font-[500] flex items-center">
                {data.email}
              </div>
            </div>
            <div className="flex border-t-[1px] border-solid border-[#000000] h-[32px]">
              <div className="w-[94.02px] flex items-center justify-center border-r-[1px] h-full border-solid border-[#000000] ">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3346 1.36523C6.55606 1.36523 2.66797 5.25333 2.66797 10.0319C2.66797 14.8105 6.55606 18.6986 11.3346 18.6986C16.1132 18.6986 20.0013 14.8105 20.0013 10.0319C20.0013 5.25333 16.1132 1.36523 11.3346 1.36523ZM18.8151 9.28511C17.7263 9.67738 16.6607 9.96055 15.6255 10.1546C15.6318 9.88084 15.6423 9.60709 15.6255 9.33229C15.4472 6.29691 13.918 3.96639 12.8219 2.66266C16.0188 3.30666 18.4878 5.98542 18.8151 9.28511ZM8.19123 10.2438C8.18074 9.96687 8.17235 9.68892 8.18808 9.41203C8.38002 6.07772 10.4725 3.61607 11.3346 2.73504C12.1968 3.61188 14.283 6.05988 14.4791 9.40047C14.498 9.71513 14.4927 10.0298 14.477 10.3434C12.1087 10.6518 9.95225 10.5249 8.19123 10.2438ZM14.3406 11.5338C13.9798 13.4574 12.9646 15.3705 11.3336 17.248C9.67955 15.3422 8.66111 13.4019 8.31394 11.4499C9.32503 11.5989 10.4484 11.6975 11.6619 11.6975C12.5136 11.6964 13.4114 11.6461 14.3406 11.5338ZM9.84736 2.66266C8.75131 3.96534 7.22209 6.29691 7.04273 9.33229C7.0291 9.56409 7.04064 9.79588 7.04273 10.0277C5.53658 9.70568 4.42899 9.31029 3.88044 9.09108C4.28425 5.88159 6.71339 3.29407 9.84736 2.66266ZM3.8301 10.3088C4.54227 10.5783 5.67818 10.9496 7.13188 11.2423C7.41507 13.3368 8.35485 15.4051 9.96903 17.42C6.56236 16.7917 3.96016 13.8633 3.8301 10.3088ZM12.7002 17.42C14.284 15.4429 15.2196 13.4134 15.5227 11.3597C16.5904 11.172 17.697 10.8909 18.8287 10.5049C18.6116 13.9703 16.044 16.8033 12.7002 17.42Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="pl-[18.42px] flex text-[12px] font-[500] items-center">
                {data.sociaLinks.map((detail, index) => (
                  <>{detail.link}</>
                ))}
              </div>
            </div>
            <div className="flex border-y-[1px] border-solid border-[#000000] h-[32px]">
              <div className="w-[94.02px] flex items-center justify-center border-r-[1px] h-full border-solid border-[#000000] ">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3183 1.33398C7.82432 1.33398 4.98438 4.29566 4.98438 7.94196C4.98438 13.8209 10.6408 18.3317 10.9028 18.514C11.1436 18.7184 11.493 18.7184 11.7326 18.514C11.9734 18.3317 17.651 13.8197 17.651 7.94196C17.6522 4.29566 14.8122 1.33398 11.3183 1.33398ZM11.3183 10.7214C9.83334 10.7214 8.63174 9.46777 8.63174 7.94196C8.63174 6.39278 9.83334 5.13916 11.3183 5.13916C12.7819 5.13916 13.9824 6.39278 13.9824 7.94196C13.9824 9.46777 12.7808 10.7214 11.3183 10.7214Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="pl-[18.42px] text-[12px] font-[500] flex items-center">
                {data.location}
              </div>
            </div>
          </div>
          <div className="text-[12px] font-[500] text-[#414042]">
            {data.summery}
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="text-[14px] font-[400] py-[8px] pl-[14px] border-y-[1px] border-solid border-[#000000]">
              SKILLS
            </div>
          </div>
          {data?.skills?.length > 0 && (
            <>
              <div className="flex flex-col gap-3 ">
                {data.skills?.map((detail, index) => {
                  const calculateWidthPercentage = (rating) => {
                    let ratingPercentage = 0;
                    if (rating && rating.length > 0) {
                      const zerosCount = rating.filter(
                        (val) => val === 0
                      ).length;

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
                    <div className=" pr-3 flex flex-col" key={index}>
                      <div className="justify-between flex items-center gap-4">
                        <p className="text-[#000000] font-inter text-[12px] font-[400] w-[80px] font-light">
                          {detail.skill}
                        </p>
                        <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                          <div
                            className="h-full bg-[#316059]"
                            style={{ width: `${ratingPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Resume8;
