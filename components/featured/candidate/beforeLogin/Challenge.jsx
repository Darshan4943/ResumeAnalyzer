import React from "react";

const Challenge = () => {
  const arr = [
    {
      img: "/images/candidate/update.png",
      title: "Be updated with relevant roles.",
      content:
        "Elevate your decision-making game! Complete your profile for valuable insights into roles aligning with your skills for your next career move!",
    },
    {
      img: "/images/candidate/hire.png",
      title: "Lucrative offers from global employers",
      content:
        "Receive exclusive invitations to apply from leading global employers who are intrigued by your profile, and submit applications with just one click.",
    },
    {
      img: "/images/candidate/job.png",
      title: "Suggested job matching notifications",
      content:
        "Be notified whenever a new position that matches your experience, location and skills while browsing.",
    },
    {
      img: "/images/candidate/time.png",
      title: "Real time updates for job applications",
      content:
        "Feeling left in the dark after applying? Track the progress of your application in real time and receive updates at each stage.",
    },
  ];

  return (
    <div className="customMargins">
      <div className="flex flex-col items-center gap-6 mt-9">
        <div className="">
          <p className="text-black text-4xl font-bold text-center ">
            It can be challenging to find the suitable job, but with{" "}
            <span className="text-blue">Skilotech</span>, that's a piece of
            cake!
          </p>
        </div>
        <div className="w-[792px] h-[1px] bg-gray-line"></div>

        <div className=" flex items-center gap-6 justify-center mb-[60px] w-full flex-wrap ">
          {arr.map((item) => (
            <div className="flex w-[456px] h-[348px] p-4 flex-col items-center gap-6 rounded-[12px] bg-blue-50 shadow-md">
              <div className="w-[212px] h-[142px]">
                <img
                  src={item.img}
                  alt=""
                  className="h-full w-full  object-contain"
                />
              </div>
              <div className=" flex flex-col w-[424px] gap-2 ">
                <p className=" text-black text-center lg:text-xl font-semibold">
                  {item.title}
                </p>

                <p className="w-[424px] h-[60px] text-gray-line text-center text-1xl leading-[20px] font-medium">
                  {" "}
                  {item.content}{" "}
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
