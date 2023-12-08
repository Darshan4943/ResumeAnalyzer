import React from 'react'
import Profile1 from '~/components/featured/candidate/afterLogin/services/Profile1'


function InterviewQue() {
    return (
        <div>
            <Profile1 />
            <div className="w-full h-full flex flex-start gap-[24px] customMargins py-6">
                <div
                    className="flex justify-center rounded-[16px] p-[16px] "
                    style={{
                        boxShadow: " 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <div className="w-[90%] flex flex-col gap-[12px] text-[14px]">
                        <p className="w-[100%] h-[24px]  text-2xl">
                            Commonly asked Interview questions
                        </p>
                        <p className="w-[100%] px-[16px] py-[12px] font-medium text-[#fff] border-solid border-[1px] border-[#06A9EF] not-italic	bg-[#06A9EF] rounded-lg">
                            Tell me about yourself.
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg">
                            What programming languages are you most comfortable with?
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            Can you explain the difference between a class and an object?
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            Describe RESTful architecture.
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            Explain the difference between SQL and NoSQL databases.
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            How do you optimize the performance of a website or application?
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            What is version control, and why is it important?
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            How do you handle security in your applications?
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            Describe the Agile development process.
                        </p>
                        <p class="w-[100%] px-[16px] py-[12px] font-medium	border-solid border-[1px] border-[#646464] not-italic	 rounded-lg ">
                            How do you stay updated on the latest technology trends?
                        </p>
                    </div>
                </div>
                <div
                    class="w-[57.44%]  p-[16px] flex flex-col gap-[12px] h-[482px] rounded-lg "
                    style={{
                        boxShadow: " 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <p class="w-full text-[20px] font-[500]">Tell me about yourself.</p>
                    <p className="w-full text-[14px] font-[600]">Answer:</p>
                    <textarea placeholder='Type here' class=" h-[126px] my-[12px] rounded-lg border-[#646464] border-[0.7px] border-solid px-4 py-3"></textarea>
                    <button class="rounded-[8px] border-[0.7px] w-[125px] h-[41px] border-[#06A9EF] ">
                        Submit
                    </button>
                </div>
            </div>

        </div>
    )
}

export default InterviewQue
