import React, { useState } from 'react'

function GenerateAi() {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (

        <div className=' bg-cover bg-no-repeat bg_generateAi py-[78px] my-[36px]  w-screen '>
            <div className='ml:w-[90%]  md:w-[60%] ms:w-[70%] sm:w-[80%] w-[95%] flex ml:flex-row flex-col items-center gap-6 customMargins sm:px-4 px-2 rounded-[16px] py-6 ' style={{ boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.25)", background: "rgba(255, 255, 255, 0.25)" }} >
                <div className=' ml:w-[37%] w-[95%] flex flex-col gap-2 rounded-[16px] p-4 bg-white ' style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }} >
                    <p className='w-full font-medium'> About Me</p>
                    <textarea
                        type="text"
                        name="aboutMe"
                        className="w-full text-[14px] min-h-[200px] font-montserrat font-small h-full border border-[#06A9EF] rounded-[8px] outline-none"
                        placeholder=""
                      
                        value={text}
                    />
                    <div className='w-full flex justify-end items-center gap-3'>
                        <button className=' flex gap-2 sm:px-3 px-[5px] py-2 border items-center border-[#06A9EF] rounded-[8px] min-w-[155px] sm:min-w-[170px]'>
                            <img src="/images/home/robot.png " alt="" className='max-h-[22px] w-[22px]' />
                            <p className=" text-[12px]  ">
                                Generate with AI
                            </p>
                        </button>
                        <button

                            className="py-2 px-4 text-[12px]  bg-[#06A9EF] rounded-[8px] text-white "
                        >
                            Save
                        </button>

                    </div>

                </div>
                <div className=' ml:w-[19.85%] w-[70%]  flex flex-col gap-4 justify-center text-center items-center'>
                    <div className='flex w-[95%] flex-wrap text-center items-center justify-center ml:text-[1.7vw] text-[24px] font-bold'>
                        <span className='text-center'>   Try our Generative AI Feature to </span> &nbsp; <span className='px-[40px] text-[#BB57E1]'>  Improve </span> &nbsp; <span className='px-[70px]'>&</span>  &nbsp; <span className='px-[50px] text-[#06A9EF]'>Enhance</span>&nbsp;your profile
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 w-[90%]'>
                        <p className='text-[14px] font-semibold'>Type something about yourself & Click on</p>
                        <button className=' w-[60%] flex gap-2 sm:px-3 px-[5px] py-2 border items-center border-[#06A9EF] bg-white rounded-[8px] min-w-[155px] sm:min-w-[170px]'>
                            <img src="/images/home/robot.png " alt="" className='max-h-[22px] w-[22px]' />
                            <p className=" text-[12px] text-center ">
                                Generate with AI
                            </p>
                        </button>
                        <p className='text-[14px] font-semibold'>to Try now!</p>
                    </div>
                </div>
                <div className='ml:w-[39%] w-[95%] border-dashed border-[2px] border-[#06A9EF] p-2 rounded-[16px]'>
                    <div className='  flex w-full h-full flex-col gap-2 rounded-[16px] p-4 bg-white ' style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }} >
                        <p className='w-full font-medium'> About Me</p>
                        <textarea
                            type="text"
                            name="aboutMe"
                            className="w-full min-h-[200px] text-[14px] font-montserrat font-small h-full border border-[#06A9EF] rounded-[8px] outline-none p-4"
                            placeholder=""
                            onChange={handleTextChange}
                            value={text}
                        />

                        <div className='w-full flex justify-end items-center gap-3'>
                            <button className=' flex gap-2 sm:px-3 px-[5px] py-2 border items-center border-[#06A9EF] rounded-[8px] min-w-[155px] sm:min-w-[170px]'>
                                <img src="/images/home/robot.png " alt="" className='max-h-[22px] w-[22px]' />
                                <p className=" text-[12px]  ">
                                    Generate with AI
                                </p>
                            </button>
                            <button

                                className="py-2 px-4 text-[12px]  bg-[#06A9EF] rounded-[8px] text-white "
                            >
                                Save
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default GenerateAi
