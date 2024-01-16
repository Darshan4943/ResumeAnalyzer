import React , {useState} from "react";

const questions = [
  "Tell me about yourself Tell me about yourself Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
  "Tell me about yourself",
];

const CommanlyAsk = ({setVisible}) => {
  const [clickedIndex, setClickedIndex] = useState(null);



  const handleItemClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index);
    setVisible(true)
  };
  return (
    <div
      className="flex justify-center rounded-[16px] p-[16px] xxsm:w-full "
      style={{
        boxShadow: " 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="w-full flex flex-col gap-[12px] text-[14px] xxsm:w-full">
        <p className="text-[20px] font-medium text-[#333]">
          Commonly asked Interview questions
        </p>
        {questions.map((question, index) => (
          <p
            key={index}
            className={`w-[100%] px-[16px] py-[12px] font-medium not-italic rounded-lg border-solid border-[1px] ${
              clickedIndex === index
                ? "bg-[#06A9EF] text-white border-[#06A9EF]"
                : "border-[#646464] text-[#333]"
            }`}
            onClick={() => handleItemClick(index)}
          >
            {question}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CommanlyAsk;
