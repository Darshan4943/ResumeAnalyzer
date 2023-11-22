import React from "react";

const Challenge = () => {
  const arr = [
    {
      img: "./images/candidate/update.png",
      title: "Get update with relevant roles.",
      content: "For better decision-making regarding your next move, finish your profile and gain insight into the roles and positions you would actually deserve."

    },
    {
      img: "./images/candidate/hire.png",
      title: "Get job offers from employers",
      content: "Get invites to apply from top employers across the world who are interested in your profile and submit your application with one click."
    },
    {
      img: "./images/candidate/job.png",
      title: "Get the appropriate job matches",
      content: "Be notified anytime a new position that matches your experience, abilities, and skillsets arises while browsing jobs that fulfill these criteria."
    },
    {
      img: "./images/candidate/time.png",
      title: "Get real time updates",
      content: "Never again be left in the dark! Follow the progress of your applications in real time and receive updates at each stage."
    },

  ];

  return (
    <div className="customMargins">
      <div className="flex flex-col items-center gap-6 mt-9">
        <div className="">
          <p className="text-black text-4xl font-bold text-center ">
            It can be challenging to find the suitable work, but with{" "}
            <span className="text-blue">Skilotech</span>, you won't have to worry.
          </p>
        </div>
        <div className="w-[792px] h-[1px] bg-gray-line"></div>

       

        <div className=" flex items-center gap-6 justify-center mb-[60px] w-full flex-wrap ">
          {arr.map((item) => (
            <div className="flex w-[456px]  p-4 flex-col items-center gap-6 rounded-[12px] bg-blue-50 shadow-md">
              <div className="w-[212px] h-[142px]">
                <img
                  src={item.img}
                  alt=""
                  className="h-full w-full  object-contain"
                />
              </div>
              <div className=" flex flex-col w-[424px] gap-2 ">
                <p className=" text-black text-center lg:text-xl font-semibold">{item.title}</p>
              
               <p className="w-[424px] h-[60px] text-gray-line text-center text-1xl leading-[20px] font-medium"> {item.content} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
