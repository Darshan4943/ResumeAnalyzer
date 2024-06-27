import React, { useReducer, useState } from "react";
import ExistingChat from "./existingChat";
import ChatBox from "./chatBox";

const messages = ["HIii", "HIii", "HIii", "HIii"];

const features = [
  { id: 1, text: "Feature No 1", imgSrc: "/images/resumeBuilder/gift.png" },
  { id: 2, text: "Feature No 2", imgSrc: "/images/resumeBuilder/gift.png" },
  { id: 3, text: "Feature No 3", imgSrc: "/images/resumeBuilder/gift.png" },
  { id: 4, text: "Feature No 4", imgSrc: "/images/resumeBuilder/gift.png" },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isNew, setIsNew] = useState(false);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className=" w-full h-auto min-h-[93vh] flex">
        <div className="flex w-full justify-center min-h-[93vh] ">
          <ExistingChat
            messages={messages}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleToggleSidebar={handleToggleSidebar}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            forceUpdate={forceUpdate}
            recall={recall}
            isNew={isNew}
            setIsNew={setIsNew}
          />
          <ChatBox
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            features={features}
            selectedChat={selectedChat}
            forceUpdate={forceUpdate}
            recall={recall}
            setSelectedChat={setSelectedChat}
            handleToggleSidebar={handleToggleSidebar}
            isNew={isNew}
            setIsNew={setIsNew}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
