import React, { useEffect, useReducer, useRef, useState } from "react";
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
  const [isNew, setIsNew] = useState(false);
  const [popUp, setPopUp] = useState(false)

  useEffect(() => {
    if (existingChatDayWise?.Today?.[0] && !isNew) {
      setSelectedChat(existingChatDayWise.Today[0]);
    }
  }, [existingChatDayWise]);

  useEffect(() => {
    const dateSeter = (date) => {

      const currentDate = new Date();
      const targetDate = new Date(date);

      if (isNaN(targetDate)) {
        console.error("Invalid date:", date);
        return "Invalid Date";
      }

      const isToday = currentDate.toDateString() === targetDate.toDateString();

      const yesterdayDate = new Date(currentDate);
      yesterdayDate.setDate(currentDate.getDate() - 1);
      const isYesterday = yesterdayDate.toDateString() === targetDate.toDateString();

      if (isToday) {
        return "Today";
      } else if (isYesterday) {
        return "Yesterday";
      } else {
        return targetDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
    };

    const data = JSON.parse(localStorage.getItem("chat"));
    if (data) {
      const dataToUpdate = Object.keys(data).map((key) => ({
        name: key,
        time: data[key][0]?.time,
      }));
      const dataToShow = {};
      dataToUpdate.forEach((item) => {
        const date = dateSeter(item.time);
        if (date !== "Invalid Date") {
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

  const getSortedDates = (dates) => {
    return dates.sort((a, b) => {
      const dateA = new Date(a === "Today" ? new Date() : a === "Yesterday" ? new Date(new Date().setDate(new Date().getDate() - 1)) : new Date(a));
      const dateB = new Date(b === "Today" ? new Date() : b === "Yesterday" ? new Date(new Date().setDate(new Date().getDate() - 1)) : new Date(b));
      return dateB - dateA;
    });
  };
  const [activeChat, setActiveChat] = useState(null);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setActiveChat(chat);
    setPopUp(true);
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      
      setPopUp(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [initialWidth, setInitialWidth] = useState('35%');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1150) {
        setInitialWidth('28%');
      } else if (window.innerWidth >= 900) {
        setInitialWidth('32%');
      } else {
        setInitialWidth('35%'); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.div className="flex  gap-2"
        initial={{ width: initialWidth }}
        animate={{ width: isSidebarOpen ? "0px" : initialWidth, opacity: isSidebarOpen ? 0 : 1, x: isSidebarOpen ? '-350%' : '0px' }}
        transition={{ duration: 0.1 }}
      >
        <div
          className="w-full relative flex h-[100vh] overflow-y-auto "
        >
          <div className="flex flex-col w-[100%] h-[100%] bg-[#fff] ">
            <div 
            className=" p-4 flex flex-col gap-4  ">
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
                onClick={() => { setSelectedChat(null); setIsNew(true); createNewChat() }}
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
                  {getSortedDates(Object.keys(existingChatDayWise)).map((key, index) => (

                    <div key={index} className="flex flex-col gap-4">
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        {key}
                      </p>
                      {existingChatDayWise[key]?.map((chat, index) => (
                        <div
                          className=" flex flex-col gap-4 cursor-pointer"
                          onClick={() => handleChatClick(chat)}
                          key={index}
                        >

                          <div
                            style={{ flexDirection: 'row' }}
                            className={`flex justify-between relative items-center hover:bg-[#FFFEEF] ${selectedChat === chat ? 'border-[1px] bg-[#FFFEEF] border-[#EEE890]' : ""} py-[5px] px-[24px] flex-col m-w-[252px]`}>
                            <p className={`text-[12px] font-Montserrat ${selectedChat === chat ? "font-[700] " : "font-[500]"
                              }`}>
                              {chat}{" "}...

                            </p>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setPopUp((prev) => (activeChat === chat ? !prev : true));
                                setActiveChat(chat);
                              }}
                              className=" w-[20px] items-center flex  justify-center h-[20px] ">
                              <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.49563 3.5C1.08188 3.5 0.729167 3.35271 0.4375 3.05813C0.145833 2.76354 0 2.40938 0 1.99563C0 1.58188 0.147292 1.22917 0.441875 0.9375C0.736459 0.645833 1.09062 0.5 1.50437 0.5C1.91812 0.5 2.27083 0.647292 2.5625 0.941875C2.85417 1.23646 3 1.59062 3 2.00437C3 2.41812 2.85271 2.77083 2.55813 3.0625C2.26354 3.35417 1.90938 3.5 1.49563 3.5ZM5.99563 3.5C5.58188 3.5 5.22917 3.35271 4.9375 3.05813C4.64583 2.76354 4.5 2.40938 4.5 1.99563C4.5 1.58188 4.64729 1.22917 4.94187 0.9375C5.23646 0.645833 5.59062 0.5 6.00437 0.5C6.41813 0.5 6.77083 0.647292 7.0625 0.941875C7.35417 1.23646 7.5 1.59062 7.5 2.00437C7.5 2.41812 7.35271 2.77083 7.05812 3.0625C6.76354 3.35417 6.40938 3.5 5.99563 3.5ZM10.4956 3.5C10.0819 3.5 9.72917 3.35271 9.4375 3.05813C9.14583 2.76354 9 2.40938 9 1.99563C9 1.58188 9.14729 1.22917 9.44188 0.9375C9.73646 0.645833 10.0906 0.5 10.5044 0.5C10.9181 0.5 11.2708 0.647292 11.5625 0.941875C11.8542 1.23646 12 1.59062 12 2.00437C12 2.41812 11.8527 2.77083 11.5581 3.0625C11.2635 3.35417 10.9094 3.5 10.4956 3.5Z" fill="#1C1B1F" />
                              </svg>
                            </div>
                            {activeChat === chat && popUp && (
                              <div
                              ref={taskRef}
                                style={{ opacity: popUp ? 1 : 0, transition: 'opacity 0.5s' }}
                                className="absolute z-[20] top-[31px] right-[0] w-[108px] bg-[#FFFFFF] flex flex-col border-[0.5px] border-[#DEDEDE] p-[6px] rounded-[12px]">
                                <div className="items-center hover:bg-[#F0F0F0]  justify-center flex rounded-[6px] p-[8px] gap-[8px]">
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 12.5H2.5625L10.375 4.6875L9.3125 3.625L1.5 11.4375V12.5ZM0.75375 14C0.542917 14 0.364583 13.9285 0.21875 13.7854C0.0729167 13.6425 0 13.4653 0 13.2537V11.4444C0 11.2453 0.0347222 11.0556 0.104167 10.875C0.173611 10.6944 0.284722 10.5278 0.4375 10.375L10.375 0.4375C10.5278 0.284722 10.6933 0.173611 10.8717 0.104167C11.0499 0.0347222 11.2374 0 11.4342 0C11.6308 0 11.8194 0.0347222 12 0.104167C12.1806 0.173611 12.3472 0.284722 12.5 0.4375L13.5625 1.5C13.7153 1.65278 13.8264 1.81944 13.8958 2C13.9653 2.18056 14 2.36486 14 2.55292C14 2.75361 13.9651 2.94486 13.8954 3.12667C13.8257 3.30847 13.7147 3.47458 13.5625 3.625L3.625 13.5625C3.47222 13.7153 3.3059 13.8264 3.12604 13.8958C2.94618 13.9653 2.75701 14 2.55854 14H0.75375ZM9.83438 4.16563L9.3125 3.625L10.375 4.6875L9.83438 4.16563Z" fill="#06A9EF" />
                                  </svg>
                                  <p className="font-[500] text-[12px] text-[#333333]">Rename</p>
                                </div>

                                <div className="items-center hover:bg-[#F0F0F0] justify-center flex rounded-[6px] p-[8px] gap-[8px]">
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g mask="url(#mask0_3175_38028)">
                                      <path d="M6.75674 16.5841C6.38698 16.5841 6.07125 16.4533 5.80955 16.1916C5.54785 15.9299 5.41699 15.6141 5.41699 15.2444V5.50082H4.41699V4.4175H8.0003V3.51367H12.0003V4.4175H15.5836V5.50082H14.5836V15.2353C14.5836 15.6206 14.4541 15.9418 14.1951 16.1987C13.936 16.4557 13.619 16.5841 13.2439 16.5841H6.75674ZM13.5003 5.50082H6.5003V15.2444C6.5003 15.3192 6.52435 15.3806 6.57243 15.4287C6.62051 15.4768 6.68195 15.5008 6.75674 15.5008H13.2439C13.308 15.5008 13.3667 15.4741 13.4202 15.4207C13.4736 15.3673 13.5003 15.3085 13.5003 15.2444V5.50082ZM8.33687 14.0008H9.42018V7.00082H8.33687V14.0008ZM10.5804 14.0008H11.6637V7.00082H10.5804V14.0008Z" fill="#C00000" />
                                    </g>
                                  </svg>


                                  <p className="font-[500] text-[12px] text-[#333333]">Delete</p>
                                </div>
                              </div>
                            )}
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
