import React, { useState, useEffect } from 'react';
import { camelCase } from '../../../utils/middleware';
import { AssessmentSvg } from '../../../utils/svg';

const QuestionList = ({ questions, answers, selectedSkill, checkAnswer }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const updatedData = questions.map((questionItem, index,) => ({
      ...questionItem,
      yourAns: answers[index]?.Answer,
    }));
    setData(updatedData);
  }, [questions, answers]);


  return (
    <div className='w-[895px] p-6 flex flex-col gap-2  bg-watermark bg-cover bg-no-repeat'>

      <div className='flex gap-4  justify-between'>
        <img
          src="/images/logo_skilotech.png"
          alt=""
          className="object-contain h-[40px]"
        />
        <div className='flex gap-3 items-center '>
          <AssessmentSvg />
          <span className='mt-[-14px] text-[18px] font-semibold'> {camelCase(selectedSkill)} Assessment</span>

        </div>
        <div className="text-[18px]  font-[600] ">
          <span className=''> Score :{" "}</span>

          {((checkAnswer() / questions.length) * 100) / 10} / 10{" "}
        </div>


      </div>
      <div className='flex flex-col gap-2 '>
        {data.map((questionItem, index) => (
          <div className="flex flex-col gap-1 py-2" key={index}>
            <div className='flex gap-2'>
              <span className='font-semibold min-w-[95px]'>Question {index + 1} :</span> {questionItem.question}
            </div>
            <div className={`flex gap-2 font-medium ${questionItem.answer === questionItem.yourAns ? "text-[#0C8A0A]" : "text-red"} `}>
              <span className='font-semibold text-[#000000] min-w-[120px]'>Your Answer :</span>  {questionItem.yourAns}
            </div>
            <div className='flex gap-2 font-medium'>
              <span className='font-semibold font min-w-[140px]'>Correct Answer :</span>  {questionItem.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
