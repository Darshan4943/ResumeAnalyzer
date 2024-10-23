import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { formatDate } from "../../utils/middleware";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import FileError from "../../components/models/fileError";
import mammoth from "mammoth";
import LimitUsedModal from "../../components/models/limitUsedModal";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Temp = ({ data, setParentCount, parentCount }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count != data.length) {
        setCount(count + 1);
      }
      if (count == data.length) {
        setParentCount(parentCount + 1);
      }
    }, 4);
    return clearTimeout(() => timeout());
  }, [count]);
  return <>{data.slice(0, count)}</>;
};
const formatData = (data) => {
  return data?.split("\n");
};
// const ParentTemp = ({ answer, i, chat }) => {
//   const [count, setCount] = useState(1);
//   return chat.length - 1 == i
//     ? formatData(answer)
//         ?.slice(0, count)
//         ?.map((item, index) => (
//           <div className="w-full py-1 text-[14px]" key={index}>
//             <Temp data={item} setParentCount={setCount} parentCount={count} />
//           </div>
//         ))
//     : formatData(answer)?.map((item, index) => (
//         <div className="w-full py-1 text-[14px]" key={index}>
//           {item}
//         </div>
//       ));
// };

const ParentTemp = ({ answer, i, chat, chatEndRef, once }) => {
  const [count, setCount] = useState(1);

  // Effect to scroll to bottom whenever count or answer changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [count, answer, chatEndRef]);

  // Function to format answer and render line by line
  const renderAnswerLines = () => {
    const formattedData = formatData(answer);
    if (formattedData) {
      if (chat.length - 1 === i && once) {
        return formattedData.slice(0, count).map((item, index) => (
          <div className="w-full py-1 text-[14px]" key={index}>
            <Temp data={item} setParentCount={setCount} parentCount={count} />
          </div>
        ));
      } else {
        return formattedData.map((item, index) => (
          <div className="w-full py-1 text-[14px]" key={index}>
            {item}
          </div>
        ));
      }
    }
    return null;
  };

  return <>{renderAnswerLines()}</>;
};

const ChatBox = ({
  features,
  selectedChat,
  recall,
  forceUpdate,
  handleToggleSidebar,
  setSelectedChat,
  isSidebarOpen,
  setIsSidebarOpen,
  setIsNew,
  isNew,
  once, setOnce
}) => {
  const userDataGlobal = useSelector((state) => state.userData);
  const [existingChat, setExistingChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const divRef = useRef(null);
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const chatEndRef = useRef(null);
  const [img, setImg] = useState(null);
  const [errorModel, setError] = useState(false);
  const [chatCountDaily, setChatCountDaily] = useState(0)
  const [chatCountDailyLimit, setChatCountDailyLimit] = useState(0)
  const [chatCountMonthly, setChatCountMonthly] = useState(0)
  const [chatCountMonthlyLimit, setChatCountMonthlyLimit] = useState(0)
  const [activePlan, setActivePlan] = useState(0)
  useEffect(() => {
    const chatCountDaily = JSON.parse(localStorage.getItem("chatCountDaily"));
    const chatCountMonthly = JSON.parse(localStorage.getItem("chatCountMonthly"));
    const chatCountDailyLimit = JSON.parse(localStorage.getItem("chatCountDailyLimit"));
    const chatCountMonthlyLimit = JSON.parse(localStorage.getItem("chatCountMonthlyLimit"));
    const activePlan = JSON.parse(localStorage.getItem("activePlan"));
    setChatCountDaily(chatCountDaily)
    setChatCountMonthly(chatCountMonthly)
    setChatCountDailyLimit(chatCountDailyLimit)
    setChatCountMonthlyLimit(chatCountMonthlyLimit)

    setActivePlan(activePlan)
  }, [])

  const [limitPopup, setLimitPopup] = useState(false);

  // const updateChatCount = () => {
  //   axios
  //     .put(
  //       `https://api.shindedarshan.com/api/subscription/updateChatLimit/${userDataGlobal._id}`
  //     )
  //     .then((res) => {   localStorage.setItem("chatCount", chatCount-1); 
  //       const chatCounts = Number(localStorage.getItem("chatCount"));
  //       setChatCount(chatCounts)
  //     })
  //     .catch((err) => console.error(err));
  // }

  const updateChatCount = () => {
    if (chatCountDailyLimit === null) {
      localStorage.setItem("chatCountMonthly", chatCountMonthly + 1);
      const chatCounts = JSON.parse(localStorage.getItem("chatCountMonthly"));
      setChatCountMonthly(chatCounts)
    } else {
      localStorage.setItem("chatCountDaily", chatCountDaily + 1);
      const chatCounts = JSON.parse(localStorage.getItem("chatCountDaily"));
      setChatCountDaily(chatCounts)
    }

  }

  const submitHandler = (e) => {

    e.preventDefault();
    if (chatCountDailyLimit === null) {
      if (chatCountMonthly >= chatCountMonthlyLimit) {
        setLimitPopup(true);
        return;
      }
    } else {
      if (chatCountDaily >= chatCountDailyLimit) {
        setLimitPopup(true);
        return;
      }
    }
    if (text?.length > 5) {
      const obj = {
        question: text,
        lastQuestion: chat.slice(chat.length - 5, chat.length),
        img,
        extractedData,
      };
      setLoading(true);
      axios
        .post("https://api.shindedarshan.com/api/qna", {
          question: text,
          lastQuestion: chat.slice(chat.length - 5, chat.length),
          userType: userDataGlobal.role,
          userId: userDataGlobal._id
        })
        .then((res) => {
          setOnce(true)
          const answer = res.data.data;
          const dummyData = { ...existingChat };
          const newName = text.slice(0, 20);
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
          updateChatCount()
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Enter valid question");
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chat]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat"));
    if (data) {
      setExistingChat(data);
      setChat(data[selectedChat]);
    }
  }, [selectedChat, recall]);

  const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          try {
            pdf.getPage(pageNumber).then(function (page) {
              page.getTextContent().then(function (textContent) {
                const textItems = textContent.items.map((item) => item.str);
                resolve(textItems.join(" "));
              });
            });
          } catch (err) {
            reject(err);
            return;
          }
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const extracteText = async (file) => {
    return new Promise(async (resolve, reject) => {
      let textData = "";
      if (
        file?.type ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target.result;
          var doc = new Docxtemplater(new PizZip(content), {
            delimiters: {
              start: "12op1j2po1j2poj1po",
              end: "op21j4po21jp4oj1op24j",
            },
          });
          var text = doc.getFullText();
          textData = text;
        };
        reader.readAsBinaryString(file);
      }
      // else if (file?.type == "application/msword") {
      //   const formData = new FormData();
      //   formData.append("file", file);
      //   try {
      //     const response = await axios.post(
      //       "https://api.shindedarshan.com/convert",
      //       formData,
      //       {
      //         responseType: "blob",
      //       }
      //     );
      //     const blob = new Blob([response.data], {
      //       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      //     });
      //     const arrayBuffer = await blob.arrayBuffer();

      //     const { value } = await mammoth.extractRawText({ arrayBuffer });
      //     console.log(123, value);
      //   } catch (err) {
      //     setError(123, "Error processing the file.");
      //   }
      // }
      else if (file?.type == "application/pdf") {
        let fullText = "";
        const pdfTextPromises = [];
        const fileUrl = URL.createObjectURL(file);

        const loadingTask = pdfjs.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          pdfTextPromises.push(fileToText(file, i));
        }
        Promise.all(pdfTextPromises)
          .then(async (texts) => {
            fullText = texts.join("");
            textData = fullText;
          })
          .catch((err) => {
            reject(err);
            return;
          });
      }
      setTimeout(() => {
        resolve(textData);
      }, 1000);
    });
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file?.type == "image/png" || file?.type == "image/jpeg") {
      const formData = new FormData();
      formData.append("img", file);
      axios
        .post("https://api.shindedarshan.com/api/getImageUrl", formData)
        .then((res) => {
          if (res.data.success) {
            setImg(res.data.location);
          } else {
            toast.error("Something went wrong while uploading image");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong while uploading image");
        });
    } else {
      extracteText(file).then((textData) => {
        const text = textData ? textData : "";
        if (text.length > 10) {
          setFile(file);
          setExtractedData(text);
        } else {
          setError(true);
        }
      });
    }
  };

  const createNewChat = () => {
    const lastChatIndex = existingChat ? Object.keys(existingChat).length : 0;
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
      {/* {limitPopup && (
        <div className="z-[200000]">
          <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
        </div>
      )} */}
      {errorModel && <FileError setError={setError} />}
      <div className=" justify-center items-center flex w-[100%] relative flex-row bg-[#fff] ">
        {isSidebarOpen && (
          <div className="w-[80px] ml:flex  hidden flex-col gap-6 px-2 py-4 items-center min-h-[calc(100vh-57.33px)] bg-[#FBFBFB]">
            <img
              src="/images/resumeBuilder/sklogo.png"
              alt=""
              className="h-[24px] w-[24px]"
            />

            <div
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setSelectedChat(null);
                setIsNew(true);
                createNewChat();
              }}
              className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer"
            >
              +
            </div>
            <div
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className=" flex items-center justify-center p-2  bg-[#FFFEEF] border border-[#EEE890] leading-tight"
            >
              <svg
                width="12"
                height="4"
                viewBox="0 0 12 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.49563 3.5C1.08188 3.5 0.729167 3.35271 0.4375 3.05813C0.145833 2.76354 0 2.40938 0 1.99563C0 1.58188 0.147292 1.22917 0.441875 0.9375C0.736459 0.645833 1.09062 0.5 1.50437 0.5C1.91812 0.5 2.27083 0.647292 2.5625 0.941875C2.85417 1.23646 3 1.59062 3 2.00437C3 2.41812 2.85271 2.77083 2.55813 3.0625C2.26354 3.35417 1.90938 3.5 1.49563 3.5ZM5.99563 3.5C5.58188 3.5 5.22917 3.35271 4.9375 3.05813C4.64583 2.76354 4.5 2.40938 4.5 1.99563C4.5 1.58188 4.64729 1.22917 4.94187 0.9375C5.23646 0.645833 5.59062 0.5 6.00437 0.5C6.41813 0.5 6.77083 0.647292 7.0625 0.941875C7.35417 1.23646 7.5 1.59062 7.5 2.00437C7.5 2.41812 7.35271 2.77083 7.05812 3.0625C6.76354 3.35417 6.40938 3.5 5.99563 3.5ZM10.4956 3.5C10.0819 3.5 9.72917 3.35271 9.4375 3.05813C9.14583 2.76354 9 2.40938 9 1.99563C9 1.58188 9.14729 1.22917 9.44188 0.9375C9.73646 0.645833 10.0906 0.5 10.5044 0.5C10.9181 0.5 11.2708 0.647292 11.5625 0.941875C11.8542 1.23646 12 1.59062 12 2.00437C12 2.41812 11.8527 2.77083 11.5581 3.0625C11.2635 3.35417 10.9094 3.5 10.4956 3.5Z"
                  fill="#1C1B1F"
                />
              </svg>
            </div>
          </div>
        )}

        <button
          className={`absolute ${isSidebarOpen ? "ml:left-[75px]" : "ml:left-[0px]"
            } ml:top-[45vh] left-0 top-[2vh] px-1 py-2 flex items-center justify-center bg-[#FBFBFB] rounded-r-[4px]`}
          onClick={handleToggleSidebar}
        >
          <img
            src="/images/resumeBuilder/chatArrow.png"
            alt=""
            className={`h-[24px] w-[24px] transform transition-transform ${isSidebarOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        <div className=" ml:w-[100%] w-[100%] flex items-center justify-between flex-col min-h-[calc(100vh-140px)]">
          {chat?.length > 0 ? (
            <div
              style={{ scrollbarWidth: "none" }}
              className="flex flex-col gap-[16px] scr1150:w-[60%] sm:w-[70%] w-[90%] sm:pt-0 pt-10 h-[80vh] overflow-y-auto"
            // ref={divRef}
            >
              {chat?.map((item, index) => (
                <div key={index} className="flex flex-col gap-[12px]">
                  <div className="flex w-full gap-[14px]">
                    {/* <img
              className="rounded-full object-cover h-[38px] w-[38px]"
              src={
                userDataGlobal?.profilePicture ||
                "/images/profile/profileNew.png"
              }
            /> */}
                    <div
                      style={{ width: "fit-content" }}
                      className="text-[12px] w-full font-[600] border border-[#bebebe] px-[16px] py-[8px] bg-[#F7F7F7] rounded-[30px]"
                    >
                      {item.quation}
                    </div>
                  </div>
                  <div className="flex w-full pl-[16px] gap-[14px] items-start">
                    <div className="flex items-center justify-center bg-[#fff] h-[24px] w-[24px] min-w-[24px] rounded-[50%] border border-[#bebebe]">
                      <img
                        className="rounded-full object-contain h-[10px] w-[18px]"
                        src={"/images/Robot.png"}
                      />
                    </div>
                    <div className="rounded-[8px] w-full px-[16px] py-[0px] bg-[#fff]">
                      <ParentTemp
                        answer={item.answer}
                        i={index}
                        chat={chat}
                        chatEndRef={chatEndRef}
                        once={once}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} className="h-[2rem] mt-5" />
            </div>
          ) : (
            <>
              <div className="flex w-full ">
                <div className="flex w-full items-center justify-center">
                  <div className="flex flex-col gap-[60px] w-[480px] h-[320px] ">
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
                      <div className="w-full flex flex-col gap-[4px] items-center">
                        <p className="text-[14px] font-[500] font-Montserrat text-[#333]">
                          Tell me what are you looking for?
                        </p>
                      </div>
                    </div>
                    {/* <div className="w-full gap-6 flex items-center justify-center">
                      {features?.map((feature, index) => (
                        <div
                          key={index}
                          className="gap-2 w-[120px] border-[#DEDEDE] border-[0.5px] rounded-2xl p-3 bg-white flex flex-col items-start"
                        >
                          <img
                            src={feature.imgSrc}
                            alt={feature.text}
                            className="h-[20px] w-[20px]"
                          />
                          <p className="text-[11px] font-[500] font-Montserrat text-[#808080]">
                            {feature.text}
                          </p>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="w-[90%] gap-3 flex flex-col items-start sticky">
            {limitPopup && (
              <div className="text-[14px] text-red pl-2">
                {`You have reached your daily limit of Chatbot Usage (${chatCountDailyLimit === null ? chatCountMonthlyLimit : chatCountDailyLimit} per day) with your current plan.`}
              </div>
            )}
            <form
              className="w-full h-[40px] gap-[14px] rounded-[26px] p-[2px_4px] bg-[#FFFFFF] border border-[#DEDEDE] flex  items-center"
              onSubmit={submitHandler}
            >

              <div className="gap-1 flex w-full items-center pl-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your Questions here"
                  className="text-[12px] font-[400] font-Montserrat w-full"
                />
                <button className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
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
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
