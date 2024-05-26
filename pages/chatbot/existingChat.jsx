import React, { useEffect, useReducer, useState } from "react";
import { dateSeter } from "../../utils/middleware";
import { motion } from "framer-motion";

const ExistingChat = ({
  isSidebarOpen,
  handleToggleSidebar,
  messages,
  selectedChat,
  setSelectedChat,
  recall,
  forceUpdate,
  setIsSidebarOpen,
}) => {
  const [existingChatDayWise, setExistingChatDayWise] = useState([]);

  const [existingChat, setExistingChat] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat"));
    if (data) {
      const dataToUpdate = Object.keys(data).map((key) => ({
        name: key,
        time: data[key][0]?.time,
      }));
      const dataToShow = {};
      dataToUpdate.forEach((item) => {
        const date = dateSeter(item.time);
        if (date != "NaN undefined NaN ") {
          if (!dataToShow[date]) {
            dataToShow[date] = [];
          }
          dataToShow[date].push(item.name);
        }
      });
      setExistingChatDayWise(dataToShow);
      setExistingChat(data);
    }
  }, [recall]);
  const createNewChat = () => {
    const lastChatIndex = Object.keys(existingChat).length;
    const newChat = {};
    newChat[`chat-${lastChatIndex + 1}`] = [];
    localStorage.setItem(
      "chat",
      JSON.stringify({ ...newChat, ...existingChat })
    );
    setSelectedChat(`chat-${lastChatIndex + 1}`);
    forceUpdate();
  };





  return (
    <>
      {/* <motion.div  className="flex w-[18%] gap-2"
      initial={{width:"18%"}} 
      animate={{width:isSidebarOpen ? "0px" : '18%' , opacity: isSidebarOpen ? 0 :1 , x: isSidebarOpen ? '-350%':'0px'}} 
      transition={{duration:0.1 }}  
      >
        <div 
       
          className="w-full relative flex h-[100vh] overflow-y-auto "
         >
          <div className="flex flex-col w-[100%] h-[100%] bg-[#fff] ">
            <div className=" p-4 flex flex-col gap-4 ">
              <div className="flex gap-3 items-center justify-center">
                <img
                  src="/images/resumeBuilder/sklogo.png"
                  alt=""
                  className="h-[24px] w-[24px]"
                />
                <p className="text-[18px] font-[600] font-Montserrat">
                  Skilotech GenAI
                </p>
              </div>
              <div
                className="flex gap-[10px] items-center justify-end w-full"
                onClick={() => createNewChat()}
              >
                <p className="text-[14px] font-[500] font-Montserrat">
                  New Chat
                </p>
                <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
                  +
                </div>
              </div>
            </div>
            <div className="w-full overflow-y-auto bg-[#fff]">
              <div className="flex flex-col w-full p-6">
                <div className="flex flex-col gap-6 ">
                  {Object.keys(existingChatDayWise).map((key) => (
                    <div className="flex flex-col gap-4">
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        {key}
                      </p>
                      {existingChatDayWise[key]?.map((chat, index) => (
                        <div
                          className=" flex flex-col gap-4 cursor-pointer"
                          onClick={() => setSelectedChat(chat)}
                          key={index}
                        >
                          <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                            <p className="text-[12px] font-Montserrat font-medium">
                              {chat}
                            </p>
                          </div>
                          
                          
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div 
           
            onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
            className="absolute right-[-24px] top-[45vh] ">
              
              {" "}
              <button
                className="h-full flex items-center w-full"
                onClick={handleToggleSidebar}
              >
              
              </button>
            </motion.div>
          </div>
        </div >

      </motion.div > */}
      <>
        {/* <motion.div
  className="flex m-w-[272px] gap-2"
  initial={{ minwidth: "272px" }}
  animate={{ width: isSidebarOpen ? "0px" : '272px', opacity: isSidebarOpen ? 0 : 1, x: isSidebarOpen ? '-350%px' : '0px' }}
  transition={{ duration: 0.1 }}
  // className="flex w-[272px] gap-2"
  // initial={{ width: "272px" }}
  // animate={{ width: isSidebarOpen ? "0px" : '272px', opacity: isSidebarOpen ? 0 : 1, x: isSidebarOpen ? '-350px' : '0px' }}
  // transition={{ duration: 0.1 }}
>
  <div className="w-full relative flex h-[100vh] overflow-y-auto">
    <div className="flex flex-col w-[100%] h-[100%] bg-[#fff]">

      <div className="p-4 flex flex-col gap-4">
        <div className="flex gap-3 items-center justify-center">
          <img
            src="/images/resumeBuilder/sklogo.png"
            alt=""
            className="h-[24px] w-[24px]"
          />
          <p className="text-[16px] md-text-[18px] font-[600] font-Montserrat">
            Skilotech GenAI
          </p>
        </div>
        <div
          className="flex gap-[10px] items-center justify-end w-full"
          onClick={() => createNewChat()}
        >
          <p className="text-[14px] font-[500] font-Montserrat">
            New Chat
          </p>
          <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
            +
          </div>
        </div>
      </div>
      <div className="w-full overflow-y-auto bg-[#fff]">
        <div className="flex flex-col w-full p-6">
          <div className="flex flex-col gap-6">
            {Object.keys(existingChatDayWise).map((key) => (
              <div className="flex flex-col gap-4" key={key}>
                <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                  {key}
                </p>
                {existingChatDayWise[key]?.map((chat, index) => (
                  <div
                    className="flex flex-col gap-4 cursor-pointer"
                    onClick={() => setSelectedChat(chat)}
                    key={index}
                  >
                    <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                      <p className="text-[12px] font-Montserrat font-medium">
                        {chat}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute right-[-24px] top-[45vh]"
      >
        <button
          className="h-full flex items-center w-full"
          onClick={handleToggleSidebar}
        >
        </button>
      </motion.div>
    </div>
  </div>
</motion.div> */}

        {/* <motion.div
          className="flex m-w-[272px] gap-2"
          initial={{ minwidth: "272px" }}
          animate={{
            width: isSidebarOpen ? "0px" : "272px",
            opacity: isSidebarOpen ? 0 : 1,
            x: isSidebarOpen ? "-350%px" : "0px",
          }}
          transition={{ duration: 0.1 }}
        > */}
        <motion.div
          className="flex sm:m-w-[367px] gap-2  "
          initial={{ minwidth: "367px" }}
          animate={{
            width: isSidebarOpen ? "0px" : "367px",
            opacity: isSidebarOpen ? 0 : 1,
            x: isSidebarOpen ? "-350%px" : "0px",
          }}
          transition={{ duration: 0.1 }}
        >
          
          <div className="w-full  flex h-[100vh] overflow-y-auto absolute z-10">
            <div className="flex flex-col w-[273px] h-[100%] bg-[#fff]">
              <div className="p-4 flex flex-col gap-4 relative">
                <div className="flex gap-3 items-center justify-center">
                  <img
                    src="/images/resumeBuilder/sklogo.png"
                    alt=""
                    className="h-[24px] w-[24px]"
                  />
                  <p className="text-[14px] sm-text-[18px] font-[600] font-Montserrat">
                    Skilotech GenAI
                  </p>
                </div>
                <div
                  className="flex gap-[10px] items-center justify-end w-full"
                  onClick={() => createNewChat()}
                >
                  <p className="text-[14px] font-[500] font-Montserrat">
                    New Chat
                  </p>
                  <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.16797 6.83073H1.0013C0.765191 6.83073 0.567274 6.75087 0.407552 6.59115C0.24783 6.43142 0.167969 6.23351 0.167969 5.9974C0.167969 5.76129 0.24783 5.56337 0.407552 5.40365C0.567274 5.24392 0.765191 5.16406 1.0013 5.16406H5.16797V0.997396C5.16797 0.761285 5.24783 0.563368 5.40755 0.403646C5.56728 0.243924 5.76519 0.164062 6.0013 0.164062C6.23741 0.164062 6.43533 0.243924 6.59505 0.403646C6.75478 0.563368 6.83464 0.761285 6.83464 0.997396V5.16406H11.0013C11.2374 5.16406 11.4353 5.24392 11.5951 5.40365C11.7548 5.56337 11.8346 5.76129 11.8346 5.9974C11.8346 6.23351 11.7548 6.43142 11.5951 6.59115C11.4353 6.75087 11.2374 6.83073 11.0013 6.83073H6.83464V10.9974C6.83464 11.2335 6.75478 11.4314 6.59505 11.5911C6.43533 11.7509 6.23741 11.8307 6.0013 11.8307C5.76519 11.8307 5.56728 11.7509 5.40755 11.5911C5.24783 11.4314 5.16797 11.2335 5.16797 10.9974V6.83073Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute  right-2 top-5 sm:hidden block ">
                   <img
              src="/images/resumeBuilder/arw.png"
              alt=""
              className= "h-[24px] w-[24px] " 
              onClick={handleToggleSidebar}
            />
                </div>
             
              </div>
              <div className="w-full overflow-y-auto bg-[#fff]">
                <div className="flex flex-col w-full p-6">
                  <div className="flex flex-col gap-6">
                    {Object.keys(existingChatDayWise).map((key) => (
                      <div className="flex flex-col gap-4" key={key}>
                        <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                          {key}
                        </p>
                        {existingChatDayWise[key]?.map((chat, index) => (
                          <div
                            className="flex flex-col gap-4 cursor-pointer"
                            onClick={() => setSelectedChat(chat)}
                            key={index}
                          >
                            <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                              <p className="text-[12px] font-Montserrat font-medium">
                                {chat}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute right-[-24px] top-[45vh]"
              >
                <button
                  className="h-full flex items-center w-full"
                  onClick={handleToggleSidebar}
                ></button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </>
    </>
  );
};

export default ExistingChat;
