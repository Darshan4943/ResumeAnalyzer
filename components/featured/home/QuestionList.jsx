import React, { useState, useEffect } from 'react';

const QuestionList = ({ questions, answers }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const updatedData = questions.map((questionItem, index) => ({
      ...questionItem,
      yourAns: answers[index]?.Answer,
    }));
    setData(updatedData);
  }, [questions, answers]);
  console.log(13,data)

  return (
    <div className='w-[895px] p-6'>
      {data.map((questionItem, index) => (
        <div className="flex flex-col gap-2 py-3" key={index}>
          <div className='flex gap-2'>
            <span className='font-semibold min-w-[95px]'>Question {index + 1} </span> : {questionItem.question}
          </div>
          <div className={`flex gap-2 ${questionItem.answer === questionItem.yourAns ? "text-[#0C8A0A]": "text-red"} `}>
          <span className='font-semibold text-black'>Your Answer </span> : {questionItem.yourAns}
          </div>
          <div className='flex gap-2'>
          <span className='font-semibold'>Correct Answer </span> : {questionItem.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
