import React from "react";
import { useSelector } from "react-redux";

function Certificate({
  selectedSkill,
  level,
  setDownloadCertificate,
  downloadCertificate,
}) {
  const userDataGlobal = useSelector((state) => state.userData);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the day, month, and year
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Format the date string
    return `${month} ${day} ${year}`;
  }


  return (

    <div
      style={{
        backgroundImage: `url(${"/images/resumeBuilder/skilltest.png"})`,
        // height: "100%",
        // width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="gap-6 flex flex-col  items-center mt-8  pt-[60px] relative w-[1056px] h-[746px]  "
    >
      <div className=" w-[100%] h-[10%] flex flex-col justify-center items-center ">
        <img
          src="/images/logo_skilotech.png"
          className="w-[322px] h-[100px]"
        />
      </div>
      <div className=" w-[100%] h-[10%] flex flex-col justify-center items-center ">
        <span className="font-Montserrat text-[44px] font-semibold text-[ #333333] uppercase">
          Certificate of Completion
        </span>
      </div>
      <div className=" h-[328px] gap-4 flex flex-col justify-center items-center">
        <span className="font-Montserrat text-[28px] font-[500] text-[ #333333]">
          This is to certify that
        </span>

        <div className="w-[100%]  gap-2 flex flex-col justify-center items-center">
          <span className="font-Montserrat text-[34px] font-[600] text-[ #333333] uppercase">
            {userDataGlobal.firstName} {userDataGlobal.lastName}
          </span>
          <div className="w-[90%] bg-[#FFD500] h-[1.64px]"></div>
        </div>
        <span className="font-Montserrat text-[20px] font-[500] text-[ #333333]">
          has succesfully completed the Skill Assessment on
        </span>
        <div className="w-[100%]  gap-2 flex flex-col justify-center items-center">
          <span className="font-Montserrat text-[30px] font-[500] text-[ #333333]">
            {selectedSkill} ({level})
          </span>
          <div className="w-[100%] bg-[#FFD500] h-[1.64px]"></div>
        </div>
        <div className="w-[100%]  gap-2 flex flex-col justify-center items-center">
          <span className="font-Montserrat text-[18px] font-[500] text-[ #333333]">
            Issued on :
          </span>
          <span className="font-Montserrat text-[26px] font-[500] text-[ #333333]">
            {formatDate(downloadCertificate?.date)}
          </span>
          <div className="w-[248px] bg-[#FFD500] h-[1.5px]"></div>
        </div>
      </div>

      <div className="w-[171px] h-[200px]  flex flex-col justify-center  absolute top-[475px] left-[75px]">
        <img src="/images/Group.png" className="w-[100%] h-[100%]" />
      </div>
      <div className="w-[189px] h-[75px]  flex flex-col justify-end items-end  absolute top-[640px] right-[100px]">
        {/* <span className="font-Montserrat text-[14px] font-[600] text-[ #333333]">
          REACH US AT
        </span> */}
        <span className="font-Montserrat text-[14px] font-[500] text-[#06A9EF]">
          www.skilotech.com
        </span>
        {/* <span className="font-Montserrat text-[14px] font-[500] text-[ #333333]">
          operations@skilotech.com
        </span> */}
      </div>

    </div>

  );
}

export default Certificate;
