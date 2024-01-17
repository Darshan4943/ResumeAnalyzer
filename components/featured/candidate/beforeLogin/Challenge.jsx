import React from "react";

const Challenge = () => {
  const arr = [
    {
      img: "/images/candidate/update.png",
      title: "Be updated with relevant roles.",
      content:
        "For better decision-making regarding your next move, finish your profile and gain insight into the roles and positions you would actually deserve.",
    },
    {
      img: "/images/candidate/hire.png",
      title: "Lucrative offers from global employers",
      content:
        "Get invites to apply from top employers across the world who are interested in your profile and submit your application with one click.",
    },
    {
      img: "/images/candidate/job.png",
      title: "Suggested job matching notifications",
      content:
        "Be notified anytime a new position that matches your experience, abilities, and skillsets arises while browsing jobs that fulfill these criteria.",
    },
    {
      img: "/images/candidate/time.png",
      title: "Real time updates for job applications",
      content:
        "Never again be left in the dark! Follow the progress of your applications in real time and receive updates at each stage.",
    },
  ];

  return (
    // <div className="customMargins">
    //   <div className="flex flex-col items-center gap-6 mt-9">
    //     <div className="">
    //       <p className="text-black text-4xl font-bold text-center ">
    //         It can be challenging to find the suitable job, but with{" "}
    //         <span className="text-blue">Skilotech</span>, that's a piece of
    //         cake!
    //       </p>
    //     </div>
    //     <div className="w-[792px] h-[1px] bg-gray-line"></div>

    //     <div className=" flex items-center gap-6 justify-center mb-[60px] w-full flex-wrap ">
    //       {arr.map((item) => (
    //         <div className="flex w-[456px] h-[348px] p-4 flex-col items-center gap-6 rounded-[12px] bg-blue-50 shadow-md">
    //           <div className="w-[212px] h-[142px]">
    //             <img
    //               src={item.img}
    //               alt=""
    //               className="h-full w-full  object-contain"
    //             />
    //           </div>
    //           <div className=" flex flex-col w-[424px] gap-2 ">
    //             <p className=" text-black text-center lg:text-xl font-semibold">
    //               {item.title}
    //             </p>

    //             <p className="w-[424px] h-[60px] text-gray-line text-center text-1xl leading-[20px] font-medium">
    //               {" "}
    //               {item.content}{" "}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="customMargins ">
      <div className="flex flex-col items-center gap-6 my-9">
        <div className="">
          <p className="text-[#333] text-center font-Montserrat text-[18px] font-semibold leading-[26px] lg:text-[36px] lg:leading-[48px]">
            It can be challenging to find the suitable job, but with{" "}
            <span className="text-blue">Skilotech</span>, that's a piece of
            cake!
          </p>
        </div>
        <div className="w-[300px] h-[1px] bg-gray-line md:w-[692px] lg:w-[792px]"></div>

        <div className="grid md:grid-cols-2 gap-6 sm:grid-cols-1 ">
  {arr.map((item, index) => (
    <div key={index} className="flex w-[300px] xsm:w-[324px] h-[228px] lg:w-[456px] lg:h-[290px]  flex-col items-center gap-4 rounded-[12px] bg-blue-50 shadow-md ">
      <div className="w-[164px] p-[10px] h-[110px] lg:h-[142px] lg:w-[212px]">
        <img
          src={item.img}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-[312px] lg:w-[424px] flex-wrap gap-2">
        <p className="text-[#333] text-center font-Montserrat text-[14px] lg:text-[20px]  font-semibold">
          {item.title}
        </p>
        <p className=" p-4 md:p-0 flex-wrap text-[#646464] text-center xmd:text-[10px] lg:text-[16px] text-[10px] leading-0 lg:leading-normal font-medium">
          {item.content}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Challenge;
