import React, { useEffect, useReducer, useState } from "react";
import { dateSeter } from "../../utils/middleware";

const ExistingChat = ({
  isSidebarOpen,
  handleToggleSidebar,
  messages,
  selectedChat,
  setSelectedChat,
  recall,
  forceUpdate,
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
      <div className="flex w-[24%] gap-2">
        <div
          className={`transition-transform duration-300 w-full ${
            isSidebarOpen ? "" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col w-[100%]">
            <div className="bg-[#fff] p-4 flex flex-col gap-4">
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
            <div className="w-full h-[714px] overflow-y-auto bg-[#fff]">
              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-4">
                  {Object.keys(existingChatDayWise).map((key) => (
                    <div>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        {key}
                      </p>
                      {existingChatDayWise[key]?.map((chat, index) => (
                        <div
                          className="pl-[24px] flex flex-col gap-4 cursor-pointer"
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
          </div>
        </div>

        <div
          className={`transition-transform duration-300 w-full  ${
            isSidebarOpen ? "" : "-translate-x-full"
          }`}
        >
          <button
            className="h-full flex items-center w-full"
            onClick={handleToggleSidebar}
          >
            <img
              src="/images/resumeBuilder/arw.png"
              alt=""
              className={`h-[24px] w-[24px] transform transition-transform ${
                isSidebarOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ExistingChat;
