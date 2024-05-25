// import React, { useState } from "react";

// const messages = ["HIii", "HIii", "HIii", "HIii"];

// const features = [
//   { id: 1, text: "Feature No 1", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 2, text: "Feature No 2", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 3, text: "Feature No 3", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 4, text: "Feature No 4", imgSrc: "/images/resumeBuilder/gift.png" },
// ];

// const ChatBot = () => {
//   return (
//     <>
//       <div className="bg-[#F9F9F9] w-full h-auto">
//         <div className="flex w-[100%] h-full ">
//           <div className="w-[18.3%]">
//             <div className="flex flex-col">
//               <div className="bg-[#fff] p-4 flex flex-col gap-4">
//                 <div className="flex gap-3 items-center justify-center">
//                   <img
//                     src="/images/resumeBuilder/sklogo.png"
//                     alt=""
//                     className="h-[24px] w-[24px]"
//                   />
//                   <p className="text-[18px] font-[600] font-Montserrat">
//                     Skilotech GenAI
//                   </p>
//                 </div>
//                 <div className="flex gap-[10px] items-center justify-end w-[100%]">
//                   <p className="text-[14px] font-[500] font-Montserrat">
//                     New Chat
//                   </p>
//                   <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center  bg-[#06A9EF]  cursor-pointer">
//                     +
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full  h-[714px] overflow-y-auto bg-[#fff]">
//                 <div className="flex flex-col w-full">
//                   <div className="flex flex-col gap-4">
//                     <div className="pl-[24px] flex flex-col gap-4">
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col m-w-[252px]">
//                         {messages.map((message, index) => (
//                           <p
//                             className="text-[12px] font-Montserrat font-medium"
//                             key={index}
//                           >
//                             {message}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="pl-[24px] flex flex-col gap-4">
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col">
//                         {messages.map((message, index) => (
//                           <p
//                             className="text-[12px] font-Montserrat font-medium"
//                             key={index}
//                           >
//                             {message}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="pl-[24px] flex flex-col gap-4">
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col">
//                         {messages.map((message, index) => (
//                           <p
//                             className="text-[12px] font-Montserrat font-medium"
//                             key={index}
//                           >
//                             {message}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="pl-[24px] flex flex-col gap-4">
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col">
//                         {messages.map((message, index) => (
//                           <p
//                             className="text-[12px] font-Montserrat font-medium"
//                             key={index}
//                           >
//                             {message}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="pl-[24px] flex flex-col gap-4">
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col">
//                         {messages.map((message, index) => (
//                           <p
//                             className="text-[12px] font-Montserrat font-medium"
//                             key={index}
//                           >
//                             {message}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="pl-[24px] flex flex-col gap-4">
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col">
//                         {messages.map((message, index) => (
//                           <p
//                             className="text-[12px] font-Montserrat font-medium"
//                             key={index}
//                           >
//                             {message}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-[81%] bg-[#F9F9F9] h-auto">
//             <div className="w-full justify-center items-center h-[100%] flex flex-col gap-20">
//               <div className="w-full  gap-[292px] flex">
//                 <div className="w-[5%] h-full flex items-center ml-2">
//                   <img
//                     src="/images/resumeBuilder/arw.png"
//                     alt=""
//                     className="h-[24px] w-[24px]"
//                   />
//                 </div>
//                 <div className="w-[48%] flex items-center gap-[45px] justify-start flex-col">
//                   <div className="flex flex-col   items-center">
//                     <div className="w-[165px] h-[124px] flex items-center justify-center">
//                       <img
//                         src="/images/resumeBuilder/bot.png"
//                         alt=""
//                         className="h-[68px] w-[68px]"
//                       />
//                     </div>
//                     <div className="w-full  flex flex-col gap-1 items-center">
//                       <p className="text-[14px] font-[500] font-Montserrat text-[#333] ">
//                         Tell me what are you looking for?
//                       </p>
//                       <p className="text-[12px] font-[500] font-Montserrat text-[#808080] ">
//                         Type or scan a document to get desired data on our
//                         newest Generative AI
//                       </p>
//                     </div>
//                   </div>
//                   <div className="w-full gap-6 flex items-center justify-center">
//                     {features.map((feature) => (
//                       <div
//                         key={feature.id}
//                         className="gap-2  border-[#DEDEDE] border-[0.5px] rounded-2xl p-3 bg-white flex flex-col items-start"
//                       >
//                         <img
//                           src={feature.imgSrc}
//                           alt={feature.text}
//                           className="h-[24px] w-[24px]"
//                         />
//                         <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
//                           {feature.text}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className=" w-[70%] gap-3 flex flex-col items-end">
//                 <div className="w-[768px] h-[40px] gap-[14px] rounded-[26px] p-[2px_4px] bg-[#FFFFFF] border border-[#DEDEDE] flex items-center">
//                   <div className="gap-1 flex w-full items-center">
//                     <div className="w-[44px] h-[32px]">
//                       <img
//                         src="/images/resumeBuilder/add.png"
//                         alt=""
//                         className="w-full h-full"
//                       />
//                     </div>

//                     <input
//                       type="text"
//                       placeholder="Type your Questions here"
//                       className="text-[12px] font-[400] font-Montserrat w-full"
//                     />
//                     <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center  bg-[#06A9EF]  cursor-pointer">
//                       <img
//                         src="/images/resumeBuilder/east.png"
//                         alt=""
//                         className="w-[24px] h-[24px]"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatBot;

// import React, { useState } from "react";

// const messages = ["HIii", "HIii", "HIii", "HIii"];

// const features = [
//   { id: 1, text: "Feature No 1", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 2, text: "Feature No 2", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 3, text: "Feature No 3", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 4, text: "Feature No 4", imgSrc: "/images/resumeBuilder/gift.png" },
// ];

// const ChatBot = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="bg-[#F9F9F9] w-full h-auto min-h-screen">
//       <div className="flex w-full h-full">
//         {/* Sidebar */}
//         <div
//           className={`${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 w-[18.3%] bg-white fixed z-10 h-full`}
//         >
//           <div className="flex flex-col">
//             <div className="bg-[#fff] p-4 flex flex-col gap-4">
//               <div className="flex gap-3 items-center justify-center">
//                 <img
//                   src="/images/resumeBuilder/sklogo.png"
//                   alt=""
//                   className="h-[24px] w-[24px]"
//                 />
//                 <p className="text-[18px] font-[600] font-Montserrat">
//                   Skilotech GenAI
//                 </p>
//               </div>
//               <div className="flex gap-[10px] items-center justify-end w-full">
//                 <p className="text-[14px] font-[500] font-Montserrat">New Chat</p>
//                 <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
//                   +
//                 </div>
//               </div>
//             </div>
//             <div className="w-full h-[714px] overflow-y-auto bg-[#fff]">
//               <div className="flex flex-col w-full">
//                 <div className="flex flex-col gap-4">
//                   {messages.map((message, index) => (
//                     <div className="pl-[24px] flex flex-col gap-4" key={index}>
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col m-w-[252px]">
//                         <p className="text-[12px] font-Montserrat font-medium">
//                           {message}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-[18.3%]' : 'ml-0'} `}>
//           <div className="w-full justify-center items-center h-full flex flex-col gap-20 min-h-screen">
//             <div className="w-full gap-[292px] flex">
//               <button
//                 className="w-[5%] h-full flex items-center ml-2"
//                 onClick={handleToggleSidebar}
//               >
//                 <img
//                   src="/images/resumeBuilder/arw.png"
//                   alt=""
//                   className={`h-[24px] w-[24px] transform transition-transform ${
//                     isSidebarOpen ? "" : "rotate-180"
//                   }`}
//                 />
//               </button>
//               <div className="w-[48%] flex items-center gap-[45px] justify-start flex-col">
//                 <div className="flex flex-col items-center">
//                   <div className="w-[165px] h-[124px] flex items-center justify-center">
//                     <img
//                       src="/images/resumeBuilder/bot.png"
//                       alt=""
//                       className="h-[68px] w-[68px]"
//                     />
//                   </div>
//                   <div className="w-full flex flex-col gap-1 items-center">
//                     <p className="text-[14px] font-[500] font-Montserrat text-[#333]">
//                       Tell me what are you looking for?
//                     </p>
//                     <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
//                       Type or scan a document to get desired data on our newest
//                       Generative AI
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-full gap-6 flex items-center justify-center">
//                   {features.map((feature) => (
//                     <div
//                       key={feature.id}
//                       className="gap-2 border-[#DEDEDE] border-[0.5px] rounded-2xl p-3 bg-white flex flex-col items-start"
//                     >
//                       <img
//                         src={feature.imgSrc}
//                         alt={feature.text}
//                         className="h-[24px] w-[24px]"
//                       />
//                       <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
//                         {feature.text}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="w-[70%] gap-3 flex flex-col items-end">
//               <div className="w-[768px] h-[40px] gap-[14px] rounded-[26px] p-[2px_4px] bg-[#FFFFFF] border border-[#DEDEDE] flex items-center">
//                 <div className="gap-1 flex w-full items-center">
//                   <div className="w-[44px] h-[32px]">
//                     <img
//                       src="/images/resumeBuilder/add.png"
//                       alt=""
//                       className="w-full h-full"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Type your Questions here"
//                     className="text-[12px] font-[400] font-Montserrat w-full"
//                   />
//                   <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
//                     <img
//                       src="/images/resumeBuilder/east.png"
//                       alt=""
//                       className="w-[24px] h-[24px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;

// import React, { useState } from "react";

// const messages = ["HIii", "HIii", "HIii", "HIii"];

// const features = [
//   { id: 1, text: "Feature No 1", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 2, text: "Feature No 2", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 3, text: "Feature No 3", imgSrc: "/images/resumeBuilder/gift.png" },
//   { id: 4, text: "Feature No 4", imgSrc: "/images/resumeBuilder/gift.png" },
// ];

// const ChatBot = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="bg-[#F9F9F9] w-full h-auto min-h-screen">
//       <div className="flex w-full h-full">
//         {/* Sidebar */}
//         <div
//           className={`${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 w-[18.3%] bg-white fixed z-10 h-full`}
//         >
//           <div className="flex flex-col">
//             <div className="bg-[#fff] p-4 flex flex-col gap-4">
//               <div className="flex gap-3 items-center justify-center">
//                 <img
//                   src="/images/resumeBuilder/sklogo.png"
//                   alt=""
//                   className="h-[24px] w-[24px]"
//                 />
//                 <p className="text-[18px] font-[600] font-Montserrat">
//                   Skilotech GenAI
//                 </p>
//               </div>
//               <div className="flex gap-[10px] items-center justify-end w-full">
//                 <p className="text-[14px] font-[500] font-Montserrat">New Chat</p>
//                 <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
//                   +
//                 </div>
//               </div>
//             </div>
//             <div className="w-full h-[714px] overflow-y-auto bg-[#fff]">
//               <div className="flex flex-col w-full">
//                 <div className="flex flex-col gap-4">
//                   {messages.map((message, index) => (
//                     <div className="pl-[24px] flex flex-col gap-4" key={index}>
//                       <p className="text-[12px] font-Montserrat text-[#06A9EF]">
//                         Today
//                       </p>
//                       <div className="gap-2 flex justify-start flex-col m-w-[252px]">
//                         <p className="text-[12px] font-Montserrat font-medium">
//                           {message}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-[18.3%]' : 'ml-0'} `}>
//           <div className="w-full justify-center items-center h-full flex flex-col gap-20 min-h-screen">
//             <div className="w-full gap-[292px] flex">
//               <button
//                 className="w-[5%] h-full flex items-center ml-2"
//                 onClick={handleToggleSidebar}
//               >
//                 <img
//                   src="/images/resumeBuilder/arw.png"
//                   alt=""
//                   className={`h-[24px] w-[24px] transform transition-transform ${
//                     isSidebarOpen ? "" : "rotate-180"
//                   }`}
//                 />
//               </button>
//               <div className="w-[48%] flex items-center gap-[45px] justify-start flex-col">
//                 <div className="flex flex-col items-center">
//                   <div className="w-[165px] h-[124px] flex items-center justify-center">
//                     <img
//                       src="/images/resumeBuilder/bot.png"
//                       alt=""
//                       className="h-[68px] w-[68px]"
//                     />
//                   </div>
//                   <div className="w-full flex flex-col gap-1 items-center">
//                     <p className="text-[14px] font-[500] font-Montserrat text-[#333]">
//                       Tell me what are you looking for?
//                     </p>
//                     <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
//                       Type or scan a document to get desired data on our newest
//                       Generative AI
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-full gap-6 flex items-center justify-center">
//                   {features.map((feature) => (
//                     <div
//                       key={feature.id}
//                       className="gap-2 border-[#DEDEDE] border-[0.5px] rounded-2xl p-3 bg-white flex flex-col items-start"
//                     >
//                       <img
//                         src={feature.imgSrc}
//                         alt={feature.text}
//                         className="h-[24px] w-[24px]"
//                       />
//                       <p className="text-[12px] font-[500] font-Montserrat text-[#808080]">
//                         {feature.text}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="w-[70%] gap-3 flex flex-col items-end">
//               <div className="w-[768px] h-[40px] gap-[14px] rounded-[26px] p-[2px_4px] bg-[#FFFFFF] border border-[#DEDEDE] flex items-center">
//                 <div className="gap-1 flex w-full items-center">
//                   <div className="w-[44px] h-[32px]">
//                     <img
//                       src="/images/resumeBuilder/add.png"
//                       alt=""
//                       className="w-full h-full"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Type your Questions here"
//                     className="text-[12px] font-[400] font-Montserrat w-full"
//                   />
//                   <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
//                     <img
//                       src="/images/resumeBuilder/east.png"
//                       alt=""
//                       className="w-[24px] h-[24px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;

import React, { useState } from "react";
import { motion } from 'framer-motion';

const messages = ["HIii", "HIii", "HIii", "HIii"];

const features = [
  { id: 1, text: "Feature No 1", imgSrc: "/images/resumeBuilder/gift.png" },
  { id: 2, text: "Feature No 2", imgSrc: "/images/resumeBuilder/gift.png" },
  { id: 3, text: "Feature No 3", imgSrc: "/images/resumeBuilder/gift.png" },
  { id: 4, text: "Feature No 4", imgSrc: "/images/resumeBuilder/gift.png" },
];

const ChatBot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-[#F9F9F9] w-full h-auto min-h-screen flex">
        <div className="flex w-full min-h-screen">
           <div className="flex w-[44%] gap-2">
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
                  <div className="flex gap-[10px] items-center justify-end w-full">
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
                  {messages.map((message, index) => (
                    <div className="pl-[24px] flex flex-col gap-4" key={index}>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        Today
                      </p>
                      <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                        <p className="text-[12px] font-Montserrat font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div className="pl-[24px] flex flex-col gap-4" key={index}>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        Today
                      </p>
                      <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                        <p className="text-[12px] font-Montserrat font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div className="pl-[24px] flex flex-col gap-4" key={index}>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        Today
                      </p>
                      <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                        <p className="text-[12px] font-Montserrat font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div className="pl-[24px] flex flex-col gap-4" key={index}>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        Today
                      </p>
                      <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                        <p className="text-[12px] font-Montserrat font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div className="pl-[24px] flex flex-col gap-4" key={index}>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        Today
                      </p>
                      <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                        <p className="text-[12px] font-Montserrat font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div className="pl-[24px] flex flex-col gap-4" key={index}>
                      <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                        Today
                      </p>
                      <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                        <p className="text-[12px] font-Montserrat font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                  </div>
                </div>
              </div>
            </div>

            <div   className={`transition-transform duration-300 w-full  ${
                isSidebarOpen ? "" : "-translate-x-full"
              }`}>
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


{/* <div className="flex gap-2 w-[22%]">
  <motion.div
    className={`transition-transform duration-300 w-full ${
      isSidebarOpen ? "" : "-translate-x-full"
    }`}
    initial={{ width: 0 }}
    animate={{ width: isSidebarOpen ? "100%" : 0 }}
    transition={{ duration: 0.3 }}
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
        <div className="flex gap-[10px] items-center justify-end w-full">
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
          {messages.map((message, index) => (
            <div className="pl-[24px] flex flex-col gap-4" key={index}>
              <p className="text-[12px] font-Montserrat text-[#06A9EF]">
                Today
              </p>
              <div className="gap-2 flex justify-start flex-col m-w-[252px]">
                <p className="text-[12px] font-Montserrat font-medium">
                  {message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>

  <motion.div className={`transition-transform duration-300`}>
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
  </motion.div>
</div>; */}


          
          <div className="w-[100%] justify-center items-center flex  flex-col gap-12">
            <div className="w-[48%] flex items-center gap-[45px] justify-start flex-col">
              <div className="flex flex-col items-center">
                {/* <div className="w-[165px] h-[124px] flex items-center justify-center">
                  <img
                    src="/images/resumeBuilder/bot.png"
                    alt=""
                    className="h-[68px] w-[68px]"
                  />
                </div> */}
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
            </div>
            <div className="w-[70%] gap-3 flex flex-col items-end">
              <div className="w-[768px] h-[40px] gap-[14px] rounded-[26px] p-[2px_4px] bg-[#FFFFFF] border border-[#DEDEDE] flex items-center">
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
                    placeholder="Type your Questions here"
                    className="text-[12px] font-[400] font-Montserrat w-full"
                  />
                  <div className="btn_hover_effect flex w-[48px] h-[28px] rounded-[35px] text-white font-medium justify-center items-center bg-[#06A9EF] cursor-pointer">
                    <img
                      src="/images/resumeBuilder/east.png"
                      alt=""
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
