import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useEditor } from "@tiptap/react";

const ChatBox = ({
  features,
  selectedChat,
  recall,
  forceUpdate,
  setSelectedChat,
}) => {
  const userDataGlobal = useSelector((state) => state.userData);
  const [existingChat, setExistingChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    if (text?.length > 5) {
      setLoading(true);
      axios
        .post("http://localhost:2000/api/qna", { quationText: text })
        .then((res) => {
          const answer = res.data.data;
          const dummyData = { ...existingChat };
          const newName = text.slice(0, 10);
          const chatObje = {};
          chatObje[newName] = [
            ...chat,
            { quation: text, answer, time: new Date() },
          ];
          delete dummyData[selectedChat];
          const newChat = { ...chatObje, ...dummyData };
          setSelectedChat(newName);
          localStorage.setItem("chat", JSON.stringify(newChat));
          forceUpdate();
          setLoading(false);
          setText("");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Please enter quation first");
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat"));
    if (data) {
      setExistingChat(data);
      setChat(data[selectedChat]);
    }
  }, [selectedChat, recall]);

  return (
    <>
      <div className="w-[100%] justify-center items-center flex  flex-col gap-12">
        <div className="w-[70%] flex items-center gap-[45px] justify-start flex-col min-h-[40vh]">
          {chat?.length > 0 ? (
            <div className="flex flex-col gap-[16px] w-full  ">
              {chat?.map((item, index) => (
                <>
                  <div key={index} className="flex w-full gap-[14px]  ">
                    <img
                      className=" rounded-full object-cover h-[40px] w-[40px]"
                      src={
                        userDataGlobal?.profilePicture ||
                        "/images/profile/profileNew.png"
                      }
                    />
                    <div className="rounded-[8px] w-full border border-[#bebebe] px-[16px] py-[8px] bg-[#fff]">
                      {item.quation}
                    </div>
                  </div>
                  <div key={index} className="flex w-full gap-[14px]  ">
                    <div className="flex items-center justify-center bg-[#fff] h-[40px] w-[40px] rounded-[50%] border border-[#bebebe] ">
                      <img
                        className=" rounded-full object-contain  h-[18px] "
                        src={"/images/Robot.png"}
                      />
                    </div>
                    <div className="rounded-[8px] w-full border border-[#bebebe] px-[16px] py-[8px] bg-[#fff]">
                      <div
                        style={{ background: "#fff", padding: "8px" }}
                        className="chat"
                        dangerouslySetInnerHTML={{
                          __html: item.answer,
                        }}
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              {" "}
              <div className="flex flex-col items-center">
                <div className="w-[165px] h-[124px] flex items-center justify-center">
                  <motion.img
                    src="/images/resumeBuilder/bot.png"
                    alt=""
                    className="h-[68px] w-[68px]"
                    animate={{ y: [-10, 0, -10] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
                <div className="w-full flex flex-col gap-1 items-center">
                  <p className="text-[14px] font-[500] font-Montserrat text-[#333]">
                    Tell me what are you looking for?
                  </p>
                  <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
                    Type or scan a document to get desired data on our newest
                    Generative AI
                  </p>
                </div>
              </div>
              <div className="w-full gap-6 flex items-center justify-center">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="gap-2 border-[#DEDEDE] border-[0.5px] rounded-2xl p-3 bg-white flex flex-col items-start"
                  >
                    <img
                      src={feature.imgSrc}
                      alt={feature.text}
                      className="h-[24px] w-[24px]"
                    />
                    <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="w-[70%] gap-3 flex flex-col items-end">
          <div className="w-full h-[40px] gap-[14px] rounded-[26px] p-[2px_4px] bg-[#FFFFFF] border border-[#DEDEDE] flex items-center">
            <div className="gap-1 flex w-full items-center">
              <div className="w-[44px] h-[32px]">
                <img
                  src="/images/resumeBuilder/add.png"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your Questions here"
                className="text-[12px] font-[400] font-Montserrat w-full"
              />
              <div
                onClick={submitHandler}
                className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer"
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4  text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <img
                    src="/images/resumeBuilder/east.png"
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
