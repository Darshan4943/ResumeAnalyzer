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
  setIsSidebarOpen
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
      <motion.div  className="flex w-[18%] gap-2"
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

      </motion.div >

      {/* } */}
    </>
  );
};

export default ExistingChat;
